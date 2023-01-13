import {Controller, Get, HttpCode, Param, Query} from '@nestjs/common';
import {ApiParam, ApiTags} from '@nestjs/swagger';
import {
  NewQueryTokensDto,
  TokenIdDto,
  TokenIdStringDto,
  TokenPaginationDto,
  TokenSlugDto
} from '../dto/CoinMarketCapScraper';
import {TokenService} from '../services/Token';
import {SwapTokensQueryDto} from '../dto/Token';
import {SwapService} from '../services/Swap';

@ApiTags('swap')
@Controller('/api/rest/swap')
export class SwapController {
  constructor(
    public service: SwapService
  ) {
  }

  @Get('tokens')
  @HttpCode(200)
  async swap(
    @Query() args: SwapTokensQueryDto
  ) {
    const {
      tokens,
      tokensCount
    } = (await this.service.tokens(args));
    return {
      tokens,
      tokensCount
    };
  }
}
