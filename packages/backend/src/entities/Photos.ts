import {index, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {_BaseEntity} from './_BaseEntity';
import {defaultModelOptions, defaultSchemaOptions} from '../mongoose.config';


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
    collection: 'photos'
  }
})
export class PhotoEntity extends _BaseEntity {
  @prop({required: true})
  filename!: string;
  @prop({required: true})
  filesize!: number;
  @prop({required: true})
  mimeType!: string;
  get url(): string {
    return `${process.env.SERVER_URL}/media/${encodeURI(this.filename)}`;
  }
}

export const PhotoEntityDefaultSelect = [
  'id',
  'filename',
  'filesize',
  'mimeType',
];
export default PhotoEntity;
