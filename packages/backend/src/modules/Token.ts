import {Module} from '@nestjs/common';
import {CoinMarketCapScraperService} from '../services/CoinMarketCapScraper';
import {CoinMarketCapScraperController} from '../controllers/CoinMarketCapScraper';
import {BitQueryModule} from './BitQuery';
import {CovalentModule} from './Covalent';
import {TypegooseModule} from 'nestjs-typegoose';
import TokenEntity from '../entities/Token/Token';
import {CoinMarketCapScraperModule} from './CoinMarketCapScraper';
import {TokenController} from '../controllers/Token';
import {TokenService} from '../services/Token';
import {BitQueryService} from '../services/BitQuery';
import {CovalentService} from '../services/Covalent';
import TokenTagEntity from '../entities/Token/TokenTag';
import TokenPlatformEntity from '../entities/Token/TokenPlatforms';
import TokenHistoryEntity from '../entities/Token/TokenHistory';

@Module({
  imports: [TypegooseModule.forFeature([TokenEntity, TokenTagEntity, TokenPlatformEntity,TokenHistoryEntity])],
  providers: [TokenService, BitQueryService, CovalentService],
  exports: [],
  controllers: [TokenController]
})
export class TokenModule {
}
