import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-facebook';
import {AuthByProvider, ProviderService} from '../../services/Provider';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(providerService: ProviderService) {
        super(
            {
                clientID: process.env.FACEBOOK_AUTH_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_AUTH_CLIENT_SECRET,
                callbackURL: process.env.FACEBOOK_AUTH_REDIRECT_URI,
                passReqToCallback: true,
                scope: ['email']
            },
            (async (
                req,
                access,
                refresh,
                profile,
                done
            ) => {
                const user: AuthByProvider = {
                    // firstName: profile._json.name.split(' ')[0],
                    // lastName: profile._json.name.split(' ')[1],
                    email: profile._json.email,
                    emailVerified: profile._json.email_verified
                };
                return providerService
                    .authByProvider(`FB_${profile._json.id}`, user)
                    .then(result => done(null, result))
                    .catch(error => done(error));
            })
        );
    }
}
