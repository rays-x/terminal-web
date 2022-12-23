import {modelOptions, prop, Ref} from '@typegoose/typegoose';
import {defaultModelOptions, defaultSchemaOptions} from '../../mongoose.config';
import {_BaseEntity} from '../_BaseEntity';

export const TokenPlatformEntityDefaultSelect = [
  'id',
  'name',
  'chainId'
];

@modelOptions({
  ...defaultModelOptions,
  schemaOptions: {
    ...defaultSchemaOptions,
    toJSON: {
      ...defaultSchemaOptions.toJSON,
      virtuals: true,
      transform: (doc, {_id, tags, ...rest}) => ({
        id: _id,
        ...rest
      })
    }
  }
})
export class TokenPlatform {
  id: string;
  @prop({
    required: true,
    ref: () => TokenPlatformEntity,
    autopopulate: {
      select: TokenPlatformEntityDefaultSelect
    }
  })
  platform?: Ref<TokenPlatformEntity>;

  @prop({
    required: true
  })
  address!: string;
}

@modelOptions({
  ...defaultModelOptions,
  schemaOptions: {
    ...defaultSchemaOptions,
    toJSON: {
      ...defaultSchemaOptions.toJSON,
      virtuals: true,
      transform: (doc, {_id, createdAt, updatedAt, ...rest}) => ({
        id: _id,
        createdAt,
        updatedAt,
        ...rest
      })
    },
    collection: 'tokenPlatforms'
  }
})
export class TokenPlatformEntity extends _BaseEntity {
  @prop({required: true})
  name!: string;
  @prop({required: true})
  chainId!: number;
}

export default TokenPlatformEntity;
