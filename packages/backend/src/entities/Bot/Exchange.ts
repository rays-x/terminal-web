import {index, modelOptions, prop} from '@typegoose/typegoose';
import {_BaseEntity} from '../_BaseEntity';
import {defaultModelOptions, defaultSchemaOptions} from '../../mongoose.config';
import {ExchangeFields} from './ExchangeFields';

@modelOptions({
  ...defaultModelOptions,
  schemaOptions: {
    ...defaultSchemaOptions,
    toJSON: {
      ...defaultSchemaOptions.toJSON,
      virtuals: true,
      transform: (doc, {_id, createdAt, updatedAt, ...rest}) => ({
        id: _id,
        ...rest
      })
    },
    collection: 'botExchange',
    versionKey: false,
    timestamps: false
  }
})
@index(
  {slug: 1},
  {
    unique: true,
    sparse: true,
    background: true
  }
)
export class ExchangeEntity extends _BaseEntity {
  @prop({required: true})
  slug!: string;
  @prop({required: true})
  name!: string;
  @prop({
    required: true,
    type: () => ExchangeFields
  })
  fields?: ExchangeFields[];
}

export const ExchangeEntityDefaultSelect = [
  'id',
  'slug',
  'name',
  'fields'
];
export default ExchangeEntity;
