import {Injectable}                     from '@nestjs/common';
import {PassportStrategy}               from '@nestjs/passport';
import {Strategy}                       from 'passport-google-oauth20';
import {AuthByProvider,ProviderService} from '../../services/Provider';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy,'google'){
  constructor(providerService: ProviderService){
    super({
        clientID:process.env.GOOGLE_AUTH_CLIENT_ID,
        clientSecret:process.env.GOOGLE_AUTH_CLIENT_SECRET,
        callbackURL:process.env.GOOGLE_AUTH_REDIRECT_URI,
        scope:['email','profile'],
        passReqToCallback:true
      },
      (async(
        req,
        access,
        refresh,
        profile,
        done
      ) => {
        const user: AuthByProvider={
          // firstName:profile._json.given_name,
          // lastName:profile._json.family_name,
          email:profile._json.email,
          emailVerified:profile._json.email_verified
        };
        return providerService
          .authByProvider(`G_${profile._json.sub}`,user)
          .then(result => done(null,result))
          .catch(error => done(error));
      })
    );
  }
}
