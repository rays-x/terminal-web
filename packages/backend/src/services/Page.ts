import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Languages} from '../entities/User';
import payload from 'payload';
import {get} from 'lodash';
import {HttpStatusMessages} from "../messages/http";


@Injectable()
export class PageService {
  constructor() {
  }


  async get(slug, lang: Languages) {
    const page = get(await payload.find({
      locale: lang, user: null, collection: 'pages', where: {
        slug: {
          equals: slug
        },
        '_status': {
          equals: 'published'
        }
      }, sort: '-createdAt', limit: 1
    }), 'docs.0');
    if(!page) {
      throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: HttpStatusMessages.NOT_FOUND
        },
        HttpStatus.NOT_FOUND
      );
    }
    return page
  }

}
