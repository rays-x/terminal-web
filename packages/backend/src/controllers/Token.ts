import {Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query, Req} from '@nestjs/common';
import {ApiParam, ApiTags} from '@nestjs/swagger';
import {Request} from 'express';
import {CoinMarketCapScraperService} from '../services/CoinMarketCapScraper';
import {
  NewQueryTokensDto,
  QueryPairListDto,
  QueryPairsInfoDto,
  QueryTokensDto, QueryTransactionsDto,
  TokensSortOrder,
  TransactionsResponse
} from '../dto/CoinMarketCapScraper';
import {CMC_ID_BTC_PLATFORM, CMC_ID_ETH_PLATFORM, CMC_USER_AGENT} from '../constants';
import {get} from 'lodash';
import got from 'got';
import {HttpStatusMessages} from '../messages/http';
import {TokenService} from '../services/Token';

@ApiTags('token')
@Controller('/api/rest')
export class TokenController {
  constructor(
    public service: TokenService
  ) {
  }

  @Get('tokens')
  @HttpCode(200)
  async tokens(
    @Query() {
      chains: _chains,
      ...args
    }: NewQueryTokensDto
  ) {
    const chains = typeof _chains === 'string' ? [_chains] : _chains;
    const {
      tokens,
      tokensCount
    } = (await this.service.tokens({
      chains,
      ...args
    }));
    const result = {
      tokens,
      tokensCount
    };
    return result;
  }
}
