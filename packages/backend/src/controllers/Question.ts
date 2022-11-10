import {Controller,Get,HttpCode,Param} from '@nestjs/common';
import {ApiParam,ApiTags}              from '@nestjs/swagger';
import payload                         from 'payload';
import {UserLanguage}                  from '../decorators/user';
import {get}                           from 'lodash';

@ApiTags('questions')
@Controller('/api/rest/questions')
export class QuestionsController{
  constructor(
  ){
  }
  @Get()
  @HttpCode(200)
  async questions(
    @UserLanguage() language
  ){
    const {docs}=await payload.find({
      collection:'question',
      locale:language,
      depth:1,
      user:{
        roles:['admin']
      },
      limit:1000
    });
    return docs;
  }
  @Get(':id')
  @HttpCode(200)
  @ApiParam({
    name:'id',
    type:String
  })
  async question(
    @UserLanguage() language,
    @Param('id') id: string
  ){
    const question: any=await payload.findByID({
      id:id,
      collection:'question',
      locale:language,
      user:{
        roles:['admin']
      }
    });
    return question;
  }
}
