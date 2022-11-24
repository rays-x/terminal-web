import {Module} from '@nestjs/common';
import {CoinMarketCapScraperService} from '../services/CoinMarketCapScraper';
import {CoinMarketCapScraperController} from '../controllers/CoinMarketCapScraper';
import {BitQueryService} from '../services/BitQuery';
import {BitQueryController} from '../controllers/BitQuery';
import {CovalentService} from '../services/Covalent';
import {CovalentController} from '../controllers/Covalent';

@Module({
  imports: [],
  providers: [CovalentService],
  exports: [CovalentService],
  controllers: [CovalentController]
})
export class CovalentModule {
}
