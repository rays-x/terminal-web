import {Controller, Get, HttpCode, Param, Query} from '@nestjs/common';
import {ApiParam, ApiTags} from '@nestjs/swagger';
import {NewQueryTokensDto, TokenIdDto, TokenPaginationDto, TokenSlugDto,} from '../dto/CoinMarketCapScraper';
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
    return {
      tokens,
      tokensCount
    };
  }

  @Get('token/:slug')
  @HttpCode(200)
  @ApiParam({
    name: 'slug',
    type: String
  })
  async token(
    @Param() {slug}: TokenSlugDto,
  ) {
    return this.service.token(slug);
  }

  @Get('token/:id/volume')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    type: String
  })
  async volume(
    @Param() {id}: TokenIdDto,
    @Query() args: TokenPaginationDto
  ) {
    return this.service.volume(id, args)
  }

  @Get('token/:id/liquidity')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    type: String
  })
  async liquidity(
    @Param() {id}: TokenIdDto,
    @Query() args: TokenPaginationDto
  ) {
    return this.service.liquidity(id, args)
  }

  @Get('token/:id/transfers')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    type: String
  })
  async transfers(
    @Param() {id}: TokenIdDto,
    @Query() args: TokenPaginationDto
  ) {
    return this.service.transfers(id, args)
  }

  @Get('token/:id/pairs')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    type: String
  })
  async pairs(
    @Param() {id}: TokenIdDto,
    @Query() args: TokenPaginationDto
  ) {
    return this.service.pairs(id, args)
  }
}
