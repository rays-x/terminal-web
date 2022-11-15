import {Controller, Get, HttpCode, Param, Query} from '@nestjs/common';
import {ApiParam, ApiTags} from '@nestjs/swagger';
import {CoinMarketCapScraperService} from '../services/CoinMarketCapScraper';
import {
  QueryPairListDto,
  QueryPairsInfoDto,
  QueryTokensDto,
  TokensSortOrder,
  TokensSwap
} from '../dto/CoinMarketCapScraper';

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
  @Get('dex/pairs-info')
  @HttpCode(200)
  async pairsInfo(
    @Query() {pairs, platform}: QueryPairsInfoDto
  ) {
    return this.service.pairsInfo(platform, pairs);
  }

  @Get('dex/pairs-list')
  @HttpCode(200)
  async pairList(
    @Query() {address, dex, platform}: QueryPairListDto
  ) {
    return this.service.pairsList(dex, address, platform);
  }
}
