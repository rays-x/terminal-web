import {Injectable, OnModuleInit} from '@nestjs/common';
import tus from 'tus-node-server';
import {v4 as uuid} from 'uuid';
import imageExtensions from 'image-extensions';
import {InjectRedisClient} from "nestjs-ioredis-tags";
import Redis from "ioredis";

export class FileMetadata {

  public relativePath?: string;
  public name?: string;
  public type?: string;
  public filetype?: string;
  public filename?: string;
  public extension?: string;

}

@Injectable()
export class TusService implements OnModuleInit {

  constructor(@InjectRedisClient('ray.sx') private readonly redisClient: Redis) {
  }

  private readonly tusServer = new tus.Server();

  onModuleInit() {
    this.initializeTusServer();
  }

  async handleTus(req, res) {
    return this.tusServer.handle(req, res);
  }

  private initializeTusServer() {
    this.tusServer.datastore = new tus.FileStore({
      directory: `${process.cwd()}/media`,
      path: '/api/rest/file',
      namingFunction: this.fileNameFromRequest
    });
    this.tusServer.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, async ({file: {id, upload_length, upload_metadata}}) => {
      const {
        name,
        fileName,
        type,
        mimeType
      } = upload_metadata.split(',').map(_ => _.split(' ')).reduce((prev, [key, value]) => ({
        ...prev,
        [key]: Buffer.from(value, 'base64').toString('ascii')
      }), {})
      await this.redisClient.set(`tus:upload:${id}`, JSON.stringify({
        filename: name || fileName,
        filesize: upload_length,
        mimeType: type || mimeType,
      }), 'PX', 0.5 * 60 * 60 * 1000)
    });
  }

  private fileNameFromRequest = (req) => {
    try {
      const metadata = this.getFileMetadata(req);
      const prefix: string = uuid();
      return metadata.extension ? prefix + '.' + metadata.extension : prefix;
    } catch(e) {
      console.error(e);
      // rethrow error
      throw e;
    }
  }

  private getFileMetadata(req: any): FileMetadata {
    const uploadMeta: string = req.header('Upload-Metadata');
    const metadata = new FileMetadata();
    uploadMeta.split(',').forEach(item => {
      const [key, value] = item.split(' ');
      metadata[`${key}`] = Buffer.from(value, 'base64').toString('ascii');
    });
    const extension: string = String(metadata.name).split('.').pop();
    metadata.extension = extension && imageExtensions.includes(extension) ? extension : null;
    return metadata;
  }

}