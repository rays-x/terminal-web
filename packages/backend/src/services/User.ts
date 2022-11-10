import {HttpException, HttpStatus, Inject, Injectable, Scope} from '@nestjs/common';
import {InjectModel} from 'nestjs-typegoose';
import {ReturnModelType} from '@typegoose/typegoose';
import {Photo, UserEntity, UserEntityDefaultSelect} from '../entities/User';
import {BCRYPT_SALT_ROUNDS} from '../constants';
import {UpdateProfileDto, UpdateProfilePhotoAddDto} from '../dto/Profile';
import bcrypt from 'bcrypt';
import {Types} from 'mongoose';
import {get} from 'lodash';
import Redis from 'ioredis';
import {InjectRedisClient} from 'nestjs-ioredis-tags';
import {HttpStatusMessages} from '../messages/http';
import {getPhone} from '../utils';
import {REQUEST} from '@nestjs/core';
import {PhotoEntityDefaultSelect} from "../entities/Photos";
import payload from "payload";

@Injectable({scope: Scope.REQUEST})
export class UserService {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    @InjectModel(UserEntity) private readonly repo: ReturnModelType<typeof UserEntity>,
    @InjectRedisClient('ray.sx') private readonly redisClient: Redis
  ) {
  }

  async findById(id?: Types.ObjectId): Promise<UserEntity | null> {
    if(!id) return null;
    return this.repo.findById(id).select(UserEntityDefaultSelect);
  }

  async findByIdAndUpdate(
    id: Types.ObjectId,
    args: UpdateProfileDto
  ): Promise<any | null> {
    const keys = [
      'email',
      'name',
      'language',
      'hasFinishedQuiz'
    ];
    const data = Object.fromEntries(
      Object.entries(args).filter(([_, __]) => {
        switch(_) {
          default:
            return keys.includes(_);
        }
      })
    );
    const getUser = () => this.repo.findById(id).select(['email', 'providers']);
    let userData;
    const {providersSafe} = args;
    if(data.email || (Array.isArray(providersSafe) && providersSafe.length)) {
      userData = await getUser();
    }
    if(data.email) {
      const oldEmail = get(userData || (await getUser()), 'email');
      if(data.email !== oldEmail) {
        data['emailVerified'] = false;
      }
    }
    if(Array.isArray(providersSafe)) {
      const providers = get(userData || (await getUser()), 'providers');
      data['providers'] = (Array.isArray(providers) ? providers : []).reduce<string[]>((prev, provider) => {
        const providerSafe = provider.split('_').shift();
        if(providersSafe.includes(providerSafe)) {
          return [...prev, provider];
        }
        return prev;
      }, []);
    }
    try {
      const user = (await this.repo
      .findByIdAndUpdate(id, data, {new: true})
      .select(UserEntityDefaultSelect)).toJSON();
      if(!user) return null;
      this.request.session.user.language = user.language;

      user['photos'] = get(user, 'photos', []).map(photo => get(photo, 'photo', undefined)).filter(Boolean)
      return user;
    } catch(e) {
      console.error(e.message);
      switch(e.code) {
        case 11000: {
          if('username' in e.keyValue)
            throw new HttpException([HttpStatusMessages.USERNAME_ALREADY_EXIST], HttpStatus.CONFLICT);
          break;
        }
      }
      throw new Error('Internal server error');
    }
  }

  async findByIdAndAddPhoto(
    userId: Types.ObjectId,
    {file}: UpdateProfilePhotoAddDto
  ): Promise<any | null> {
    const result = await payload.create({
      user: {
        id: userId
      },
      collection: 'photos',
      data: {},
      file: {
        data: file.buffer,
        mimetype: file.mimetype,
        name: file.originalname,
        size: file.size,
      },
    })
    if(result) {
      try {
        await this.repo.findByIdAndUpdate(userId, {
            $push: {
              photos: {
                photo: result.id
              }
            }
          }
        )
      } catch(e) {
        console.error(e)
      }
      const select = (await this.repo.findById(userId).select(UserEntityDefaultSelect)).toJSON();
      select['photos'] = get(select, 'photos', []).map(photo => get(photo, 'photo', undefined)).filter(Boolean).map((rest) => ({
        ...rest,
        url: `${process.env.SERVER_URL}/media/${encodeURI(rest.filename)}`
      }))
      return select
    }
    return null
  }

  async findByIdAndDeletePhoto(
    userId: Types.ObjectId,
    id: Types.ObjectId,
  ): Promise<any | null> {
    const user = await this.repo.findById(userId).select(['photos'])
    const prePhotos = get(user, 'photos', [])
    .map(photo => get(photo, 'photo.id', undefined))
    .filter(Boolean);
    if(prePhotos.includes(id)) {
      const photos =
        prePhotos.filter(photo => photo !== id)
        .map((photo) => ({
          photo
        }))
      try {
        await payload.delete({
          id: id.toString(),
          collection: 'photos',
        })
        await this.repo.findByIdAndUpdate(userId, {
            $set: {
              photos
            }
          }
        )
      } catch(e) {
        console.error(e)
      }
    }
    const select = (await this.repo.findById(userId).select(UserEntityDefaultSelect)).toJSON();
    select['photos'] = get(select, 'photos', []).map(photo => get(photo, 'photo', undefined)).filter(Boolean).map((rest) => ({
      ...rest,
      url: `${process.env.SERVER_URL}/media/${encodeURI(rest.filename)}`
    }))
    return select
  }

  async findByIdAndDelete(
    userId: Types.ObjectId,
  ): Promise<boolean> {
    if(String(userId) === '63458bcc5a0119a88bcab323') {
      return false
    }
    try {
      await this.repo.findByIdAndDelete(userId)
      await new Promise((resolve, reject) => {
        this.request.session.destroy((err) => err ? reject(err) : resolve(true));
      });
    } catch(err) {
      console.error(err.message);
      //
    }
    return true
  }

  async findByIdOrEmail(_id: Types.ObjectId, email?: string): Promise<any | null> {
    if(!_id && !email) return null;
    const select = (await this.repo
    .findOne(
      _id && email
        ? {
          $or: [
            {
              _id
            },
            {
              email
            }
          ]
        }
        : _id
          ? {_id}
          : {email}
    )
    .select(UserEntityDefaultSelect)).toJSON()
    select['photos'] = get(select, 'photos', []).map(photo => get(photo, 'photo', undefined)).filter(Boolean)
    // .populate('photos', PhotoEntityDefaultSelect)
    return select;
  }
}
