import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Request
} from '@nestjs/common';
import {AuthRecoverDto, AuthSignInDto, AuthSignUpDto, PayloadSignInDto} from '../dto/Auth';
import {AuthService} from '../services/Auth';
import {Authorized, Unauthorized} from '../decorators/auth';
import {UserId} from '../decorators/user';
import payload from 'payload';
import jwt from 'jsonwebtoken';
import {ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {RedirectResponse} from '@nestjs/core/router/router-response-controller';
import {Types} from "mongoose";

@Controller('/api')
export class AuthController {
  constructor(
    public service: AuthService
  ) {
  }

  @ApiTags('web','ios')
  @ApiBearerAuth('bearer-sid')
  @ApiOperation({summary: 'sign-out user'})
  @Authorized()
  @Post('/rest/auth/sign-out')
  @HttpCode(200)
  async signOut(
    @UserId() userId: Types.ObjectId
  ) {
    const result = await this.service.signOut(userId);
    return {
      success: result
    };
  }

  @ApiTags('web')
  @ApiExcludeEndpoint(process.env.ENV !== 'development')
  @Authorized()
  @Post('/admin/user/logout')
  @HttpCode(200)
  async logOut(@UserId() userId: Types.ObjectId) {
    const result = await this.service.signOut(userId);
    return {
      success: result
    };
  }

  @ApiTags('web')
  @Unauthorized()
  @Post('/rest/auth/email/sign-in')
  @HttpCode(200)
  async signIn(@Request() request: any, @Body() args: AuthSignInDto) {
    return this.service.signInByEmail(args);
  }

  @ApiTags('web')
  @Unauthorized()
  @Post('/admin/user/login')
  @ApiExcludeEndpoint(process.env.ENV !== 'development')
  @HttpCode(200)
  async login(
    @Request() request: any,
    @Body() body
  ) {
    const user = await this.service.signInByEmail({
      login: body.email,
      password: body.password
    });
    const data = {
      id: user.id,
      email: user.email,
      roles: user.roles
    };
    const token = jwt.sign(
      data,
      payload.secret,
      {
        expiresIn: 7200
      }
    );
    return {
      exp: new Date().getTime(),
      message: 'Auth passed',
      token,
      user: {
        ...data,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        loginAttempts: 0
      }
    };
  }

  @ApiTags('web')
  @Unauthorized()
  @Post('/rest/auth/email/sign-up')
  async signUp(@Request() request: any, @Body() args: AuthSignUpDto) {
    return this.service.signUpByEmail(args, false);
  }

  @ApiTags('web')
  @Unauthorized()
  @Post('/rest/auth/email/recover')
  @HttpCode(200)
  async recover(@Request() request: any, @Body() args: AuthRecoverDto) {
    await this.service.recover(args);
    return {
      success: true
    };
  }

  @ApiTags('web')
  @ApiExcludeEndpoint(process.env.NODE_ENV !== 'development')
  @Get('/rest/auth/email/recover/:code/:state')
  @Redirect(`${process.env.FRONTEND_URL || '/'}`, HttpStatus.SEE_OTHER)
  @ApiResponse({status: HttpStatus.SEE_OTHER})
  async recoverVerify(@Param('code') recoverCode: string, @Param('state') verifyCode: string): Promise<RedirectResponse> {
    const url = (await this.service.recover({recoverCode, verifyCode})).redirect;
    return {
      url,
      statusCode: HttpStatus.SEE_OTHER
    };
  }
}
