import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {BotManagerService} from '../services/BotManager';

@ApiTags('bot')
@Controller('/api/rest/bot')
export class BotManagerController {
  constructor(
    public service: BotManagerService
  ) {
  }

  @Get('bot/list')
  @HttpCode(200)
  async botList() {
    return this.service.list();
  }

  @Post('bot/create')
  @HttpCode(200)
  async botCreate() {
    return this.service.create();
  }
}
