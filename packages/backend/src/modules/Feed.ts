import {Module} from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose';
import {UserEntity} from '../entities/User';
import {FeedController} from "../controllers/Feed";
import {FeedService} from "../services/Feed";
import MatchesEntity from "../entities/Matches";
import ChatEntity from "../entities/Chat";
import {MatchController} from "../controllers/Match";

@Module({
    imports: [TypegooseModule.forFeature([UserEntity, MatchesEntity, ChatEntity])],
    providers: [FeedService],
    exports: [FeedService],
    controllers: [FeedController,MatchController]
})
export class FeedModule {
}
