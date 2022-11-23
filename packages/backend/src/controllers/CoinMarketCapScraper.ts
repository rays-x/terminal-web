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

@ApiTags('cmc')
@Controller('/api/rest/cmc')
export class CoinMarketCapScraperController {
  constructor(
    public service: CoinMarketCapScraperService
  ) {
  }

  @ApiParam({
    name: 'swap',
    enum: TokensSwap,
    example: TokensSwap.uniswap
  })
  @Get('tokens/:swap')
  @HttpCode(200)
  async uniTokens(
    @Query() {
      search,
      limit,
      offset,
      sortBy,
      sortOrder
    }: QueryTokensDto,
    @Param('swap') swap: TokensSwap
  ) {
    const tokens = (await this.service.tokens(swap)).filter((token) => {
      return search ? [
        token.id.toLowerCase(),
        token.name.toLowerCase(),
        token.symbol.toLowerCase()
      ].find((_) => _.includes(search.toLowerCase())) : true;
    });
    const result = {
      tokens: tokens
        .sort((a, b) => {
          return sortOrder === TokensSortOrder.asc
            ? String(a[sortBy]).localeCompare(String(b[sortBy]), undefined, {
              numeric: true,
              sensitivity: 'base'
            })
            : String(b[sortBy]).localeCompare(String(a[sortBy]), undefined, {
              numeric: true,
              sensitivity: 'base'
            });
        })
        .slice(Number(offset), Number(limit) + Number(offset)),
      tokensCount: tokens.length
    };
    return result;
  }

  @ApiParam({
    name: 'swap',
    enum: TokensSwap,
    example: TokensSwap.uniswap
  })
  @Post('dex/pairs-info')
  @HttpCode(200)
  async pairsInfo(
    @Body() {pairs, platform}: QueryPairsInfoDto
  ) {
    const data = await this.service.pairsInfo(platform, pairs);
    return Object.fromEntries(Object.entries(data).filter(([, value]) => 'priceUsd' in (value as Object)));
  }

  @Get('dex/pairs-list')
  @HttpCode(200)
  async pairList(
    @Query() {ethAddress, btcAddress}: QueryPairListDto
  ) {
    const [ethPairs, btcPairs] = [
      ethAddress
        ? await this.service.pairsList(['uniswap'], ethAddress, CMC_ID_ETH_PLATFORM)
        : [],
      btcAddress
        ? await this.service.pairsList(['pancakeswap'], btcAddress, CMC_ID_BTC_PLATFORM)
        : []
    ];
    return {
      ethPairs: ethPairs.slice(0, 100),
      btcPairs: btcPairs.slice(0, 100)
    };
  }

  @Post('dex/transactions')
  @HttpCode(200)
  async transactions(
    @Body() {btcPairs = [], ethPairs = []}: QueryTransactionsDto
  ): Promise<TransactionsResponse['data']['transactions']> {
    return this.service.transactions(btcPairs, ethPairs);
  }
}
