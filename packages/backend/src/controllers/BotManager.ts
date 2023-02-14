import {Body, Controller, Get, HttpCode, Post, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {BotManagerService} from '../services/BotManager';

@ApiTags('bot')
@Controller('/api/rest/hm')
export class BotManagerController {
  constructor(
    public service: BotManagerService
  ) {
  }

  @Post('user/exchange/upsert')
  @HttpCode(200)
  async exchangesUpsert(
    @Query('userId') address: string,
    @Body() body: any
  ) {
    return this.service.userExchangeUpsert(address, body);
  }

  @Get('user/exchange/list')
  @HttpCode(200)
  async userExchangesList(
    @Query('userId') address: string
  ) {
    return this.service.userExchangesList(address);
  }

  @Get('exchange/list')
  @HttpCode(200)
  async exchangesList() {
    return this.service.exchangesList();
  }

  @Get('bot/list')
  @HttpCode(200)
  async botList() {
    return this.service.botList();
  }

  @Post('bot/create')
  @HttpCode(200)
  async botCreate() {
    return this.service.botCreate();
  }
}
