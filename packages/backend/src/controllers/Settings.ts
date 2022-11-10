import {Controller,Get,HttpCode,Param} from '@nestjs/common';
import {ApiParam,ApiTags}              from '@nestjs/swagger';
import payload                         from 'payload';
import {UserLanguage}                  from '../decorators/user';
import {Types}                         from 'mongoose';
import {get}                           from 'lodash';

@ApiTags('press')
@Controller('/api/rest/press')
export class SettingsController{
  constructor(
  ){
  }
  @Get()
  @HttpCode(200)
  async settings(
    @UserLanguage() language
  ){
    const {lessons,news}=await payload.findGlobal({
      slug:'settings',
      locale:language,
      user:{
        roles:['admin']
      }
    });
    return {
      lessons,
      news
    };
  }
}
