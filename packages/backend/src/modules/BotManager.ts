import {Module} from '@nestjs/common';
import {BotManagerService} from '../services/BotManager';
import {BotManagerController} from '../controllers/BotManager';

@Module({
  imports: [],
  providers: [BotManagerService],
  exports: [BotManagerService],
  controllers: [BotManagerController]
})
export class BotManagerModule {
}
