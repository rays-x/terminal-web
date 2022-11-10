import {Module} from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose';
import {UserEntity} from '../entities/User';
import {FlowController} from "../controllers/Flow";
import {FlowService} from "../services/Flow";

@Module({
    imports: [TypegooseModule.forFeature([UserEntity])],
    providers: [FlowService],
    exports: [FlowService],
    controllers: [FlowController]
})
export class FlowModule {
}
