import {HttpException, HttpStatus, Inject, Injectable, Scope} from '@nestjs/common';
import {InjectModel} from 'nestjs-typegoose';
import {ReturnModelType} from '@typegoose/typegoose';
import {Languages, UserEntity, UserEntityDefaultSelect} from '../entities/User';
import {BCRYPT_SALT_ROUNDS} from '../constants';
import {UpdateProfileDto} from '../dto/Profile';
import bcrypt from 'bcrypt';
import {Types} from 'mongoose';
import {get} from 'lodash';
import Redis from 'ioredis';
import {InjectRedisClient} from 'nestjs-ioredis-tags';
import {HttpStatusMessages} from '../messages/http';
import {getPhone} from '../utils';
import {REQUEST} from '@nestjs/core';
import {fromBuffer} from 'file-type';
import {AnswerDto} from "../dto/Answer";
import payload from "payload";
import fs from "fs";
import got from "got";
import {ObjectId} from "mongodb";
import PhotoEntity from "../entities/Photos";
import {unSignToken} from "./Chat";

@Injectable({scope: Scope.REQUEST})
export class AnswerService {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    @InjectModel(UserEntity) private readonly repo: ReturnModelType<typeof UserEntity>,
    @InjectModel(PhotoEntity) private readonly repoPhoto: ReturnModelType<typeof PhotoEntity>,
    @InjectRedisClient('ray.sx') private readonly redisClient: Redis
  ) {
  }

  getUserToken() {
    return unSignToken(get(this.request, 'cookies.sid', get(this.request, 'authorization', '').replace(/^Bearer\s/, '')))
  }

  async answer(
    data: AnswerDto,
    language: Languages,
    userId?: Types.ObjectId,
  ): Promise<boolean> {
    const type = get(data, 'type')
    const key = get(data, 'key')
    const sessionKey = `sess:${this.getUserToken()}`;
    const session = JSON.parse(await this.redisClient.get(sessionKey) || '{}');
    if (key === 'photo') {
      const fileId = String(data.value).split('/').pop()
      const file: {
        filename: string,
        filesize: number,
        mimeType: string
      } = JSON.parse(await this.redisClient.get(`tus:upload:${fileId}`) || 'null')
      if (!file) {
        return;
      }
      const result = await this.repoPhoto.create({
        ...file,
        filename: fileId
      })
      data['value'] = result.id
      if (userId) {
        await this.repo.findByIdAndUpdate(userId, {
          $push: {
            photos: {
              photo: data.value
            }
          }
        })
      } else {
        const newUser = await this.repo.create({
          name: get(session, 'name', null),
          email: get(session, 'email', null),
          language,
          photos: [{
            photo: data.value
          }]
        })
        const {params, interests} = Object.entries(session).reduce((prev, [key, value]) => {
          if (key.startsWith('params_')) {
            return {
              ...prev,
              params: {
                ...prev.params,
                [key.replace('params_', '')]: value
              }
            };
          }
          if (key.startsWith('interests_')) {
            return {
              ...prev,
              interests: [
                ...prev.interests,
                value
              ]
            };
          }
          return prev
        }, {interests: [], params: {}})
        await this.repo.findByIdAndUpdate(newUser.id, {
          $set: {
            params
          },
          $push: {
            interests: {
              $each: interests
            }
          }
        })
        this.request.session['user'] = {
          id: newUser.id
        }
      }
    }
    switch (type) {
      case 'quiz':
      case 'breakdown': {
        if (userId) {
          await this.repo.findByIdAndUpdate(userId, {
            $push: {
              interests: {
                type: data.type,
                identifier: data.identifier,
                answer: data.value,
              }
            }
          })
        } else {
          session[`interests_${data.identifier}`] = {
            type: data.type,
            identifier: data.identifier,
            answer: data.value,
          }
        }
        await this.redisClient.set(sessionKey, JSON.stringify(session))
        return true;
      }
      case 'quiz_user_data': {
        if (['birthday', 'sex', 'lookingForSex', 'lookingForAge','purpose'].includes(key)) {
          if (userId) {
            await this.repo.findByIdAndUpdate(userId, {
              $set: {
                [`params.${key}`]: data.value
              }
            })
          } else {
            session[`params_${key}`] = data.value
          }
        } else if (['name', 'email'].includes(key)) {
          if (userId) {
            await this.repo.findByIdAndUpdate(userId, {
              [key]: data.value
            })
          } else {
            session[key] = data.value
          }
        } else {
          if (userId) {
            await this.repo.findByIdAndUpdate(userId, {
              $push: {
                interests: {
                  type: data.type,
                  identifier: data.identifier,
                  answer: data.value,
                }
              }
            })
          } else {
            session[`interests_${data.identifier}`] = {
              type: data.type,
              identifier: data.identifier,
              answer: data.value,
            }
          }
        }
        await this.redisClient.set(sessionKey, JSON.stringify(session))
        return true;
      }
      default: {
        return true;
      }
    }
  }
}
