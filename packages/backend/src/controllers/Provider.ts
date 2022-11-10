import {Body, Controller, Get, HttpStatus, Next, Param, Post, Query, Req, Res} from '@nestjs/common';
import {AuthByProvider, ProviderService, SocialProviders} from '../services/Provider';
import {NextFunction, Response} from 'express';
import {authenticate} from 'passport';
import jwt from 'jsonwebtoken';
import {ApiExcludeEndpoint, ApiOperation, ApiParam, ApiProperty, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ExpressRequest} from "../types";
import signature from 'cookie-signature'

class CallbackResponse {
  @ApiProperty()
  readonly sid!: string | null
}

@Controller('/api/rest/auth/provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {
  }

  @ApiTags('web')
  @Get(':provider(google|facebook|apple)')
  async handleOauthRequest(
    @Req() req: ExpressRequest,
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param('provider') provider: SocialProviders
  ) {
    switch(provider) {
      case "apple": {
        const url = await this.providerService.appleGetRedirectUrl()
        return res.redirect(HttpStatus.SEE_OTHER, url)
      }
      default: {
        return authenticate(provider)(req, res, next);
      }
    }
  }

  @ApiTags('web')
  @ApiExcludeEndpoint(process.env.NODE_ENV !== 'development')
  @Get(':provider(apple)/link')
  async getOauthLink(
    @Param('provider') provider: SocialProviders
  ) {
    switch(provider) {
      case "apple": {
        const url = await this.providerService.appleGetRedirectUrl()
        return {url}
      }
    }
    return {url: null}
  }

  @ApiOperation({summary: 'return authorized token'})
  @ApiTags('web', 'ios')
  @Get(':provider(google|facebook|apple)/callback')
  @ApiParam({
    name: 'provider',
    enum: SocialProviders
  })
  @ApiQuery({
    name: 'code',
    required: true
  })
  @ApiQuery({
    name: 'name',
    required: false
  })
  @ApiResponse({
    type: CallbackResponse
  })
  async handleOauthCallback(
    @Req() req: ExpressRequest,
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param('provider') provider: SocialProviders,
    @Query('code') code: string,
    @Query('name') name: string
  ) {
    switch(provider) {
      case "apple": {
        try {
          const {id_token} = await this.providerService.appleGetAccessTokenIos(code);
          const _json: any = jwt.decode(id_token);
          const user: AuthByProvider = {
            email: _json.email,
            emailVerified: _json.email_verified
          };
          if(_json.email) {
            user.email = _json.email;
          }
          if(name) {
            user.name = name;
          }
          await this.providerService
          .authByProvider(`APPLE_${_json.sub}`, user,true)
          const sid = encodeURIComponent(`s:${signature.sign(res.req.sessionID, process.env.COOKIE_SECRET)}`)
          return res.send({
            sid
          })
        } catch(e) {
          console.error(e)
        }
        return res.send({
          sid: null
        })
      }
      default: {
        return authenticate(provider, {state: code}, (err, user) => {
          if(err) return next(err);
          if(!user) res.redirect(HttpStatus.SEE_OTHER, `${process.env.FRONTEND_URL}/error?code=auth-social`);
          res.redirect(HttpStatus.SEE_OTHER, `${process.env.FRONTEND_URL}/user/social`);
        })(req, res, next);
      }
    }
  }

  @ApiTags('web')
  @ApiExcludeEndpoint(process.env.NODE_ENV !== 'development')
  @Post(':provider(google|facebook|apple)/callback')
  async handleOauthCallbackPost(
    @Res() res: Response,
    @Param('provider') provider: SocialProviders,
    @Body() body: any
  ) {
    const end = () => {
      res.redirect(HttpStatus.SEE_OTHER, `${process.env.SERVER_URL}/admin`)
    }
    try {
      if(provider !== 'apple') return end();
      const {code, name} = body;
      const {id_token} = await this.providerService.appleGetAccessToken(code);
      const _json: any = jwt.decode(id_token);
      const user: AuthByProvider = {
        email: _json.email,
        emailVerified: _json.email_verified
      };
      if(_json.email) {
        user.email = _json.email;
      }
      if(name) {
        user.name = `${name.firstName} ${name.lastName ? ` ${name.lastName}` : ''}`;
      }
      await this.providerService
      .authByProvider(`APPLE_${_json.sub}`, user)
    } catch(e) {
      console.error(e);
    }
    return end();
  }
}
