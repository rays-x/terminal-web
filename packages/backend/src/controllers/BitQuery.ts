import {Body, Controller, Get, HttpCode, Param, Post, Query} from '@nestjs/common';
import {ApiParam, ApiTags} from '@nestjs/swagger';
import {CoinMarketCapScraperService} from '../services/CoinMarketCapScraper';
import {
  QueryPairListDto,
  QueryPairsInfoDto,
  QueryTokensDto, QueryTransactionsDto,
  TokensSortOrder,
  TokensSwap, TransactionsResponse
} from '../dto/CoinMarketCapScraper';
import {CMC_ID_BTC_PLATFORM, CMC_ID_ETH_PLATFORM} from '../constants';
import {BitQueryService} from '../services/BitQuery';
import {QueryStatsTransferDto} from '../dto/BitQuery';

@ApiTags('bq')
@Controller('/api/rest/bq')
export class BitQueryController {
  constructor(
    public service: BitQueryService
  ) {
  }

  @Get('stats/transfers')
  @HttpCode(200)
  async statsTransfers(
    @Query() {
      ethAddress,
      btcAddress
    }: QueryStatsTransferDto
  ) {
    return this.service.statsTransfers(btcAddress, ethAddress);
  }

  @Get('stats/swaps')
  @HttpCode(200)
  async statsSwaps(
    @Query() {
      ethAddress,
      btcAddress
    }: QueryStatsTransferDto
  ) {
    return this.service.statsSwaps(btcAddress, ethAddress);
  }

  @Get('stats/holders')
  @HttpCode(200)
  async statsHolders(
    @Query() {
      ethAddress,
      btcAddress
    }: QueryStatsTransferDto
  ) {
    return this.service.statsHolders(btcAddress, ethAddress);
  }
}
