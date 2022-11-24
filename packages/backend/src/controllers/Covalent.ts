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
import {QueryStatsLiquidityDto} from '../dto/Covalent';
import {CovalentService} from '../services/Covalent';

@ApiTags('cov')
@Controller('/api/rest/cov')
export class CovalentController {
  constructor(
    public service: CovalentService
  ) {
  }

  @Get('stats/liquidity')
  @HttpCode(200)
  async statsLiquidity(
    @Query() {
      ethAddress,
      btcAddress
    }: QueryStatsLiquidityDto
  ) {
    return this.service.statsLiquidity(btcAddress, ethAddress);
  }
}
