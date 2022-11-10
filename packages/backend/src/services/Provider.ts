import {Inject, Injectable, Scope} from '@nestjs/common';
import UserEntity, {UserEntityDefaultSelect} from '../entities/User';
import {ReturnModelType} from '@typegoose/typegoose';
import {InjectModel} from 'nestjs-typegoose';
import {ExpressRequest} from '../types';
import AppleAuth, {AppleAuthAccessToken} from 'apple-auth';
import {get} from "lodash";
import {REQUEST} from "@nestjs/core";

export enum SocialProviders {
    google='google',
    facebook='facebook',
    apple='apple'
}

export interface AuthByProvider {
    name?: string;
    email?: string;
    emailVerified?: boolean;
    // photo?: string
}

@Injectable({scope: Scope.REQUEST})
export class ProviderService {
    private appleAuth: AppleAuth
    private appleAuthIos: AppleAuth

    constructor(
        @Inject(REQUEST) private readonly request: any,
        @InjectModel(UserEntity) private readonly repoUser: ReturnModelType<typeof UserEntity>,
    ) {
        this.appleAuth = new AppleAuth({
            client_id: process.env.APPLE_AUTH_SERVICE_ID,
            team_id: process.env.APPLE_AUTH_TEAM_ID,
            key_id: process.env.APPLE_AUTH_KEY_ID,
            redirect_uri: process.env.APPLE_AUTH_REDIRECT_URI,
            scope: "name email"
        }, process.env.APPLE_AUTH_KEY_SECRET, 'text')

        this.appleAuthIos = new AppleAuth({
            client_id: process.env.APPLE_AUTH_APP_ID,
            team_id: process.env.APPLE_AUTH_TEAM_ID,
            key_id: process.env.APPLE_AUTH_KEY_ID,
            redirect_uri: process.env.APPLE_AUTH_REDIRECT_URI,
            scope: "name email"
        }, process.env.APPLE_AUTH_KEY_SECRET, 'text')
    }

    async authByProvider(
        provider: string,
        {
            name,
            email,
            emailVerified
        }: AuthByProvider,
        debug = false
    ): Promise<any> {
        try {
            const user = await (async () => {
                const authorized = get(this.request, 'session.user.id')
                const or: any[] = [
                    {
                        providers: {
                            $elemMatch: {
                                $eq: provider
                            }
                        }
                    }
                ]
                if (authorized) {
                    or.push({
                        id: authorized
                    })
                }
                if (emailVerified) {
                    or.push({
                        email
                    })
                }
                const userExist = (await this.repoUser.findOneAndUpdate(
                    {
                        $or: or
                    },
                    {
                        $set: {
                            providers: provider
                        }
                    },
                    {
                        new: true
                    }).select([...UserEntityDefaultSelect, 'roles']));
                if (userExist) {
                    return userExist;
                }
                const newUser = await this.repoUser.create({
                    name,
                    email,
                    emailVerified,
                    providers: [provider]
                });
                return newUser;
            })();
            this.request.session['user'] = {
                id: user.id,
                language: user.language,
                roles: user.roles
            };
            return user;
        } catch (e) {
            console.error('ProviderService:authByProvider', e.message, provider, {
                name,
                email,
                emailVerified
            });
        }
        return undefined;
    }

    async appleGetRedirectUrl() {
        return this.appleAuth.loginURL()
    }

    async appleGetAccessToken(code: string): Promise<AppleAuthAccessToken> {
        try {
            return await this.appleAuth.accessToken(code);
        } catch (e) {
            console.error(e)
        }
    }
    async appleGetAccessTokenIos(code: string): Promise<AppleAuthAccessToken> {
        try {
            return await this.appleAuthIos.accessToken(code);
        } catch (e) {
            console.error(e)
        }
    }
}
