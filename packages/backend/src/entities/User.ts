import {index, modelOptions, prop, Ref, plugin} from '@typegoose/typegoose';
import {_BaseEntity} from './_BaseEntity';
import {defaultModelOptions, defaultSchemaOptions} from '../mongoose.config';
import {getEmail} from '../utils';
import PhotoEntity from "./Photos";
import autopopulate from 'mongoose-autopopulate';

class SubscriptionStripe {
  @prop()
  public cid!: string;
}

class Subscription {
  @prop({_id: false})
  public stripe?: SubscriptionStripe;
}

class Ban {
  @prop()
  public reason?: string;
}

export class Photo {
  @prop({
    ref: () => PhotoEntity,
    autopopulate: true,
  })
  public photo?: Ref<PhotoEntity>;
}

class Interest {
  @prop()
  public type?: string;
  @prop()
  public identifier?: string;
  @prop()
  public answer?: string;

}

class Params {
  @prop()
  public birthday?: string;
  @prop()
  public sex?: string;
  @prop()
  public lookingForSex?: string;
  @prop()
  public lookingForAge?: string;
  @prop()
  public purpose?: string;
}

export enum Languages {
  EN = 'en',
  RU = 'ru'
}

export enum Currencies {
  USD = 'usd',
  RUB = 'rub'
}

@plugin(autopopulate)
@modelOptions({
  ...defaultModelOptions,
  schemaOptions: {
    ...defaultSchemaOptions,
    toJSON: {
      ...defaultSchemaOptions.toJSON,
      virtuals: true,
      transform: (doc, {_id, createdAt, updatedAt, providers, password, roles, fake, ...rest}) => ({
        id: _id,
        createdAt,
        updatedAt,
        ...rest
      })
    },
    collection: 'user'
  }
})
@index(
  {email: 1},
  {
    unique: true,
    // lowercase:true,
    sparse: true,
    // trim:true,
    background: true
  }
)
@index(
  {providers: 1},
  {
    unique: false,
    background: true
  }
)
export class UserEntity extends _BaseEntity {
  @prop({
    set: (str: string) => str ? getEmail(str) : undefined,
    get: (str: string) => str || null
  })
  email?: string;
  @prop({default: false})
  emailVerified?: boolean;
  @prop()
  fake?: boolean;
  @prop()
  name?: string;
  @prop({default: null, select: false})
  password?: string;
  @prop({
    enum: Languages,
    default: Languages.EN,
    addNullToEnum: true
  })
  language?: Languages;
  @prop({
    enum: Currencies,
    default: Currencies.USD,
    addNullToEnum: true
  })
  currency?: Currencies;
  @prop({
    _id: false
  })
  subscription?: Subscription;
  @prop({default: false})
  consent?: boolean;
  @prop({default: false})
  hasFinishedQuiz?: boolean;
  @prop({
    default: [],
    type: [String],
    select: false,
    set: (ar: string[] | undefined) => Array.isArray(ar) ? [...new Set(ar)] : [],
    get: (ar: string[] | undefined) => ar
  })
  providers?: string[];

  get providersSafe(): string[] {
    return Array.isArray(this.providers) ? this.providers.reduce<string[]>((prev, provider) => {
      const providerSafe = provider.split('_').shift();
      return providerSafe ? [...prev, providerSafe] : prev;
    }, []) : [];
  }

  @prop({
    default: ['user'],
    type: [String],
    set: (ar: string[] | undefined) =>
      Array.isArray(ar) ? ar.map((str) => str.toLowerCase().trim()) : [],
    get: (ar: string[] | undefined) => ar
  })
  roles?: string[];
  @prop({
    default: [],
    type: () => Ban
  })
  bans?: Ban[];
  @prop({
    default: [],
    type: () => Photo
  })
  photos?: Photo[];
  @prop({
    default: [],
    type: () => Interest
  })
  interests?: Interest[];

  @prop({
    default: {},
    _id: false,
    type: () => Params
  })
  params?: Params;
}

export const UserEntityDefaultSelect = [
  'id',
  'email',
  'emailVerified',
  'name',
  'language',
  'currency',
  'providers',
  'photos',
  'hasFinishedQuiz'
];
export default UserEntity;
