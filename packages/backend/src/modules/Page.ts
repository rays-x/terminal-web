import {Module} from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose';
import {UserEntity} from '../entities/User';
import {FlowController} from "../controllers/Flow";
import {FlowService} from "../services/Flow";
import {PageService} from "../services/Page";
import {PageController} from "../controllers/Page";

@Module({
    imports: [TypegooseModule.forFeature([UserEntity])],
    providers: [PageService],
    exports: [PageService],
    controllers: [PageController]
})
export class PageModule {
}
