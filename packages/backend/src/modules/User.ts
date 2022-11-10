import {Module}              from '@nestjs/common';
import {TypegooseModule}     from 'nestjs-typegoose';
import {UserEntity}          from '../entities/User';
import {UserService}         from '../services/User';
import {ProfileController}   from '../controllers/Profile';
import {SettingsController}  from '../controllers/Settings';
import {QuestionsController} from '../controllers/Question';
import {PayloadController}   from '../controllers/Payload';

@Module({
  imports:[TypegooseModule.forFeature([UserEntity])],
  providers:[UserService],
  exports:[UserService],
  controllers:[ProfileController,PayloadController]
})
export class UserModule{
}
