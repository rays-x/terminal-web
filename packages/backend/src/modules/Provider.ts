import {Module}             from '@nestjs/common';
import {ProviderService}    from '../services/Provider';
import {ProviderController} from '../controllers/Provider';
import {GoogleStrategy}     from '../plugins/express/google.stratagies';
import {FacebookStrategy}   from '../plugins/express/facebook.stratagies';
import {PassportModule}     from '@nestjs/passport';
import {TypegooseModule}    from 'nestjs-typegoose';
import {UserEntity}         from '../entities/User';

@Module({
  imports:[
    PassportModule.register({session:true}),
    TypegooseModule.forFeature([UserEntity])
  ],
  controllers:[ProviderController],
  providers:[ProviderService,GoogleStrategy,FacebookStrategy],
  exports:[ProviderService]
})
export class ProviderModule{
}
