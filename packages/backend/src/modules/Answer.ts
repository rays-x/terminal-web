import {Module}              from '@nestjs/common';
import {TypegooseModule}     from 'nestjs-typegoose';
import {UserEntity}          from '../entities/User';
import {AnswerService} from "../services/Answer";
import {AnswerController} from "../controllers/Answer";
import PhotoEntity from "../entities/Photos";

@Module({
  imports:[TypegooseModule.forFeature([UserEntity,PhotoEntity])],
  providers:[AnswerService],
  exports:[AnswerService],
  controllers:[AnswerController]
})
export class AnswerModule{
}
