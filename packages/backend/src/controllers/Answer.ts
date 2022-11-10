import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiTags} from '@nestjs/swagger';
import {Language, UserId, UserLanguage} from '../decorators/user';
import {AnswerService} from "../services/Answer";
import {AnswerDto} from "../dto/Answer";
import {Languages} from "../entities/User";
import {Types} from "mongoose";
import {Authorized} from "../decorators/auth";

@Controller('/api/rest/quiz')
export class AnswerController {
  constructor(
    public service: AnswerService
  ) {
  }

  @ApiTags('web')
  @ApiOperation({summary: 'sent one answer of quiz'})
  @Post('/answer')
  @HttpCode(200)
  async answer(
    @Language() language: Languages,
    @Body() args: AnswerDto,
    @UserId() userId?: Types.ObjectId,
  ) {
    return this.service.answer(args, language, userId);
  }

  @ApiTags('ios')
  @ApiOperation({summary: 'sent all answers of quiz'})
  @Post('/answers')
  @ApiBody({
    type: [AnswerDto]
  })
  @ApiBearerAuth('bearer-sid')
  @HttpCode(200)
  @Authorized()
  async answers(
    @UserLanguage() language: Languages,
    @Body() answers: AnswerDto[],
    @UserId() userId?: Types.ObjectId,
  ) {
    await Promise.all(answers.map(async answer => {
      await this.service.answer(answer, language, userId)
    }))
    return true;
  }
}
