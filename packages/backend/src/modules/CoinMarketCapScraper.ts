import {Module}              from '@nestjs/common';
import {CoinMarketCapScraperService} from '../services/CoinMarketCapScraper';
import {CoinMarketCapScraperController} from '../controllers/CoinMarketCapScraper';

@Module({
  imports:[],
  providers:[CoinMarketCapScraperService],
  exports:[],
  controllers:[CoinMarketCapScraperController]
})
export class CoinMarketCapScraperModule{
}
