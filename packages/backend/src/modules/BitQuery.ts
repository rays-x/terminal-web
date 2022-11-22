import {Module} from '@nestjs/common';
import {CoinMarketCapScraperService} from '../services/CoinMarketCapScraper';
import {CoinMarketCapScraperController} from '../controllers/CoinMarketCapScraper';
import {BitQueryService} from '../services/BitQuery';
import {BitQueryController} from '../controllers/BitQuery';

@Module({
  imports: [],
  providers: [BitQueryService],
  exports: [BitQueryService],
  controllers: [BitQueryController]
})
export class BitQueryModule {
}
