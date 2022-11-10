import {index,modelOptions,prop} from '@typegoose/typegoose';
import {Types}                   from 'mongoose';
import {_BaseEntity}                              from './_BaseEntity';
import {defaultModelOptions,defaultSchemaOptions} from '../mongoose.config';

export type LocaleType<T>=Record<'ru'|'en',T>

@modelOptions({
  ...defaultModelOptions,
  schemaOptions:{
    ...defaultSchemaOptions,
    collection:'question'
  }
})
export class QuestionEntity extends _BaseEntity{
  @prop({
    default:null
  })
  title?: LocaleType<string>;
}

export const QuestionEntityDefaultSelect=[
  'id',
  'title',
];
export default QuestionEntity;
