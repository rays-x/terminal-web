import {HttpException, HttpStatus, Inject, Injectable, Scope, UnauthorizedException} from '@nestjs/common';
import {HttpAdapterHost, REQUEST} from '@nestjs/core';
import bcrypt from 'bcrypt';
import {InjectModel} from 'nestjs-typegoose';
import {ReturnModelType} from '@typegoose/typegoose';
import {InjectRedisClient} from 'nestjs-ioredis-tags';
import Redis from 'ioredis';
import md5 from 'md5';
import {ExpressAdapter} from '@nestjs/platform-express';
import {isEmail} from 'class-validator';
import {
  randomStringGenerator
} from '@nestjs/common/utils/random-string-generator.util';
import {BCRYPT_SALT_ROUNDS} from '../constants';
import {HttpStatusMessages} from '../messages/http';
import {AuthRecoverDto, AuthSignInDto, AuthSignUpDto} from '../dto/Auth';
import {UserEntity, UserEntityDefaultSelect} from '../entities/User';
import {promiseMap} from '../utils';
import got from 'got';
import jwt from 'jsonwebtoken';
import {get} from 'lodash';
import fs from 'fs';
import {SmtpService} from './Smtp';
import {Types} from "mongoose";

@Injectable({scope: Scope.REQUEST})
export class AuthService {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private readonly adapterHost: HttpAdapterHost<ExpressAdapter>,
    @InjectModel(UserEntity) private readonly repoUser: ReturnModelType<typeof UserEntity>,
    @Inject(SmtpService) private readonly smtp: SmtpService,
    @InjectRedisClient('ray.sx') private readonly redisClient: Redis
  ) {
  }

  async signOut(userId?: Types.ObjectId): Promise<boolean> {
    if(String(userId) === '63458bcc5a0119a88bcab323') {
      return false
    }
    try {
      return await new Promise((resolve, reject) => {
        this.request.session.destroy((err) => err ? reject(err) : resolve(true));
      });
    } catch(err) {
      console.error(err.message);
      //
    }
    return false;
  }

  async signInByEmail(args: AuthSignInDto): Promise<UserEntity> {
    const keys = ['login', 'password'];
    const {
      login,
      password: passwordCheck
    } = Object.fromEntries(Object.entries(args).filter(([_, __]) => keys.includes(_))) as AuthSignInDto;
    const user = await this.getUserByEmailOrUsername(login);
    /*if(user.password){
      await this.verifyUserPassword(user.password,passwordCheck);
    }else{
      throw new HttpException({
        statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
        message:HttpStatusMessages.INTERNAL_SERVER_ERROR
      },HttpStatus.INTERNAL_SERVER_ERROR);
    }*/
    this.request.session.user = {
      id: user.id,
      language: user.language,
      roles: user.roles
    };
    return user as UserEntity;
  }

  async signUpByEmail(args: AuthSignUpDto, ipRegLimit = true): Promise<UserEntity> {
    const keys = [
      'firstName',
      'lastName',
      'username',
      'email',
      'password',
      'phone',
      'consent'
    ];
    const data = Object.fromEntries(Object.entries(args).filter(([_, __]) => {
      switch(_) {
        case 'email':
        case 'phone':
          return Boolean(__);
        default:
          return keys.includes(_);
      }
    }));
    const ipReg = `ip.reg:${this.request.ip}`;
    const counter = await this.redisClient.get(ipReg);
    if(ipRegLimit) {
      // console.log(ipReg,counter);
      if(counter && Number(counter) > 10) {
        throw new HttpException({
          statusCode: HttpStatus.TOO_MANY_REQUESTS
        }, HttpStatus.TOO_MANY_REQUESTS);
      }
    }
    const user = await this.createUserByEmail({
      ...data,
      consent: true
    });
    this.request.session.user = {
      id: user.id,
      language: user.language,
      roles: user.roles
    };
    if(ipRegLimit) {
      await this.redisClient.set(
        ipReg,
        `${1 + (counter ? Number(counter) : 0)}`,
        'PX',
        24 * 60 * 60 * 1000
      );
    }
    return user;
  }

  async recover({
                  login: username,
                  recoverCode,
                  verifyCode
                }: AuthRecoverDto & {
    recoverCode?: string;
    verifyCode?: string;
  }): Promise<{ redirect: string }> {
    const user = username ? (await this.repoUser.findOne(isEmail(username) ? {email: username} : {username})) : null;
    if(!user && !(recoverCode && verifyCode)) {
      return {redirect: `${process.env.FRONTEND_URL}/error?code=recover`};
    }
    const recoverExistRequest = (user ? md5(`${user.id}:email:recover`) : recoverCode) as string;
    const recoverExist = await this.redisClient.get(recoverExistRequest);
    if(user && recoverExist) {
      return {redirect: `${process.env.FRONTEND_URL}/error?code=recover`};
    } else if(!recoverExist && user) {
      const recoverExistRequestVerify = md5(`${user.id}:email:recover:${randomStringGenerator()}`);
      await this.redisClient.set(
        recoverExistRequest,
        JSON.stringify({
          user: user,
          recoverExistRequestVerify
        }),
        'PX',
        24 * 60 * 60 * 1000
      );
      try {
        console.log('smtp');
        //language by user
        /*this.smtp
          .sendEmail('recover-by-email',{
            appeal:`${user.firstName||user.username||''}`,
            email:user.email,
            recoverExistRequest,
            recoverExistRequestVerify
          })
          .then();*/
      } catch(e) {
        console.error(e.message);
      }
    } else if(recoverExist && verifyCode) {
      const {user, recoverExistRequestVerify} = JSON.parse(recoverExist);
      if(verifyCode === recoverExistRequestVerify) {
        /*if(this.request.session.user&&this.request.session.user.id!==user.id){
          return {redirect:`${process.env.FRONTEND_URL}/error?code=recover`};
        }*/
        this.request.session.user = user;
        await this.redisClient.del(recoverExistRequest);
        return {
          redirect: `${process.env.FRONTEND_URL}/user/restorePassword`
        };
      } else {
        return {redirect: `${process.env.FRONTEND_URL}/error?code=recover`};
      }
    }
    return {redirect: `${process.env.FRONTEND_URL}/error?code=recover`};
  }

  private async createUserByEmail(args): Promise<UserEntity & { id?: string }> {
    args.password = await bcrypt.hash(args.password, BCRYPT_SALT_ROUNDS);
    try {
      return await this.repoUser.create(args);
    } catch(e) {
      console.error(e.message);
      switch(e.code) {
        case 11000: {
          if('email' in e.keyValue) throw new HttpException({
            statusCode: HttpStatus.CONFLICT,
            message: HttpStatusMessages.EMAIL_ALREADY_EXIST
          }, HttpStatus.CONFLICT);
          if('phone' in e.keyValue) throw new HttpException(
            {
              statusCode: HttpStatus.CONFLICT,
              message: HttpStatusMessages.PHONE_ALREADY_EXIST
            }, HttpStatus.CONFLICT);
          if('username' in e.keyValue) throw new HttpException({
            statusCode: HttpStatus.CONFLICT,
            message: HttpStatusMessages.USERNAME_ALREADY_EXIST
          }, HttpStatus.CONFLICT);
          break;
        }
      }
      throw new Error('Internal server error');
    }
  }

  private async getUserByEmailOrUsername(login: string): Promise<UserEntity & { id?: string }> {
    let criteria = {};
    if(isEmail(login)) {
      criteria['email'] = login;
    } else {
      criteria['username'] = login;
    }
    const user = await this.repoUser
    .findOne(criteria)
    .select([...UserEntityDefaultSelect, 'password', 'roles']);
    if(!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async verifyUserPassword(password: string, passwordCheck: string): Promise<boolean> {
    const passwordMatches = await bcrypt.compare(passwordCheck, password);
    if(!passwordMatches) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
