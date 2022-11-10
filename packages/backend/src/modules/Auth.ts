import {Module}              from '@nestjs/common';
import {TypegooseModule}     from 'nestjs-typegoose';
import {AuthService}         from '../services/Auth';
import {UserEntity}          from '../entities/User';
import {AuthController} from '../controllers/Auth';
import {SmtpService}         from '../services/Smtp';

@Module({
  imports:[TypegooseModule.forFeature([UserEntity])],
  providers:[AuthService,SmtpService],
  exports:[AuthService],
  controllers:[AuthController]
})
export class AuthModule{
}
