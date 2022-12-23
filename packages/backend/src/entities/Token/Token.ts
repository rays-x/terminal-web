import {index, modelOptions, prop, Ref, plugin} from '@typegoose/typegoose';
import {_BaseEntity} from '../_BaseEntity';
import {defaultModelOptions, defaultSchemaOptions} from '../../mongoose.config';
import autopopulate from 'mongoose-autopopulate';
import TokenTagEntity from './TokenTag';
import {TokenUrls} from './TokenUrls';
import {TokenStatistics} from './TokenStatistics';
import {TokenPlatform} from './TokenPlatforms';

class TokenTag {
  @prop({
    ref: () => TokenTagEntity,
    autopopulate: true
  })
  tag?: Ref<TokenTagEntity>;
}

@plugin(autopopulate)
@modelOptions({
  ...defaultModelOptions,
  schemaOptions: {
    ...defaultSchemaOptions,
    toJSON: {
      ...defaultSchemaOptions.toJSON,
      virtuals: true,
      transform: (doc, {_id, createdAt, updatedAt, tags, ...rest}) => ({
        id: _id,
        createdAt,
        updatedAt,
        tags: (({tag}) => tag),
        ...rest
      })
    },
    collection: 'token'
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
export class TokenEntity extends _BaseEntity {
  @prop({
    required: true,
    lowercase: true,
    trim: true
  })
  slug!: string;
  @prop({required: true})
  cmc!: number;
  @prop({required: true})
  cmcAdded!: Date;
  @prop({required: true})
  name!: string;
  @prop({required: true})
  symbol!: string;
  @prop()
  category?: string;
  @prop()
  description?: string;
  @prop({
    default: [],
    type: () => TokenTag
  })
  tags?: TokenTag[];
  @prop({
    _id: false,
    type: () => TokenUrls
  })
  urls?: TokenUrls;
  @prop()
  volume?: number;
  @prop()
  volumeChangePercentage24h: number;
  @prop()
  cexVolume: number;
  @prop()
  dexVolume: number;
  @prop({
    _id: false,
    type: () => TokenStatistics
  })
  statistics?: TokenStatistics;
  @prop({
    type: () => TokenPlatform
  })
  platforms?: TokenPlatform[];
  @prop()
  selfReportedTags?: string[];
  @prop()
  selfReportedCirculatingSupply?: string;
}

export const TokenEntityDefaultSelect = [
  'id',
  'slug',
  'cmc',
  'name',
  'symbol',
  'urls',
  'volume',
  'volumeChangePercentage24h',
  'statistics',
  'platforms',
  'selfReportedCirculatingSupply'
];
export default TokenEntity;
