import {Module} from '@nestjs/common';
import {BotManagerService} from '../services/BotManager';
import {BotManagerController} from '../controllers/BotManager';
import {TypegooseModule} from 'nestjs-typegoose';
import ExchangeEntity from '../entities/Bot/Exchange';
import UserEntity from '../entities/Bot/User';

@Module({
  imports: [TypegooseModule.forFeature([ExchangeEntity,UserEntity])],
  providers: [BotManagerService],
  exports: [BotManagerService],
  controllers: [BotManagerController]
})
export class BotManagerModule {
}
