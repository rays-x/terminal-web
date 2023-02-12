import {Payload, Subscribe} from 'nest-mqtt';
import Docker from 'dockerode';
import {InjectAwsService} from 'nest-aws-sdk';
import {S3} from 'aws-sdk';
import {readFileSync} from 'fs';
import {join} from 'path';
import {dump as json2Yaml, load as yaml2Json} from 'js-yaml';
import {merge} from 'lodash';


export class BotManagerService {
  docker = new Docker({socketPath: '/var/run/docker.sock'});

  constructor(
    @InjectAwsService(S3) private readonly s3: S3
  ) {
  }

  async create() {
    const id = 'test';
    const strategy = 'pmm';
    const BucketConf = `hb.bot-${id}.conf`;
    const BucketLogs = `hb.bot-${id}.logs`;
    const templatesPath = join(`${__dirname}/../view/templates/bot`);
    const confClient = json2Yaml(merge(yaml2Json(readFileSync(`${templatesPath}/conf_client.yml`, 'utf-8')), {
      instance_id: id,
      mqtt_bridge: {
        mqtt_host: process.env.MQTT_HOST
      },
      db_mode: {
        db_host: process.env.POSTGRES_HOST
      }
    }));
    const confStrategy = json2Yaml(merge(yaml2Json(readFileSync(`${templatesPath}/strategies/conf_${strategy}.yml`, 'utf-8')), {
      exchange: 'binance',
      market: 'FIRO-BUSD'
    }));
    await Promise.all([
      this.s3.createBucket({Bucket: BucketConf}).promise(),
      this.s3.createBucket({Bucket: BucketLogs}).promise()
    ]);
    await Promise.all([
      this.s3.putObject({
        Bucket: BucketConf,
        Key: 'data/.password_verification',
        Body: 'HummingBot'
      }).promise(),
      this.s3.putObject({
        Bucket: BucketConf,
        Key: 'data/conf_fee_overrides.yml',
        Body: readFileSync(`${templatesPath}/conf_fee_overrides.yml`, 'utf-8')
      }).promise(),
      this.s3.putObject({
        Bucket: BucketConf,
        Key: 'data/hummingbot_logs.yml',
        Body: readFileSync(`${templatesPath}/hummingbot_logs.yml`, 'utf-8')
      }).promise(),
      this.s3.putObject({
        Bucket: BucketConf,
        Key: 'data/conf_client.yml',
        Body: confClient
      }).promise(),
      Promise.all([{
        name: 'binance',
        api_key: 'S9IaOlJxuoyYt7CcN1X5xF64kULCUl4DkSsz2xnjusBSwmBYQSEu5klHycpK0PYS',
        api_secret: 'Q0mnfeTduaT7dlMTQETavS7Xpf3eO2tagDd6VI5Aha5zzRzMmajAq3zzAqMGIckI'
      }].map(async ({
                      name,
                      api_key,
                      api_secret
                    }) => {
        return this.s3.putObject({
          Bucket: BucketConf,
          Key: `data/connectors/${name}.yml`,
          Body: json2Yaml(merge(yaml2Json(readFileSync(`${templatesPath}/connectors/${name}.yml`, 'utf-8')), {
            [`${name}_api_key`]: api_key,
            [`${name}_api_secret`]: api_secret
          }))
        }).promise();
      })),
      this.s3.putObject({
        Bucket: BucketConf,
        Key: `data/strategies/conf_${strategy}.yml`,
        Body: confStrategy
      }).promise()
    ]);
    await (await this.docker.createContainer({
      name: `hb_bot_${id}`,
      Image: 'bardakdev/hb_pg',
      Env: [
        `CONFIG_FILE_NAME=conf_${strategy}.yml`,
        'CONFIG_PASSWORD=HummingBot'
      ],
      HostConfig: {
        Mounts: [
          {
            Type: 'volume',
            VolumeOptions: {
              NoCopy: true,
              Labels: {},
              DriverConfig: {
                Name: 's3fs',
                Options: {}
              }
            },
            Source: BucketConf,
            Target: '/conf',
            ReadOnly: false
          },
          {
            Type: 'volume',
            VolumeOptions: {
              NoCopy: true,
              Labels: {},
              DriverConfig: {
                Name: 's3fs',
                Options: {}
              }
            },
            Source: BucketLogs,
            Target: '/logs',
            ReadOnly: false
          }
        ]
      },
      Tty: true,
      OpenStdin: true
    })).start();
    return true;
  }

  async list() {

  }

  @Subscribe(`${process.env.MQTT_BOTS_NAMESPACE}/+/log`)
  mqttSubscriptionEvent_log(@Payload() payload) {
    console.log('log', payload);
  }

  @Subscribe(`${process.env.MQTT_BOTS_NAMESPACE}/+/events`)
  mqttSubscriptionEvent_events(@Payload() payload) {
    console.log('events', payload);
  }

  @Subscribe(`${process.env.MQTT_BOTS_NAMESPACE}/+/notify`)
  mqttSubscriptionEvent_notify(@Payload() payload) {
    console.log('notify', payload);
  }
}
