import {Controller, Get, HttpCode, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
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

  @Get('stats/tdv')
  @HttpCode(200)
  async tradersDistributionValue(
    @Query() {
      ethAddress,
      btcAddress
    }: QueryStatsTransferDto
  ) {
    return this.service.statsTradersDistributionValue(btcAddress, ethAddress);
  }
}
