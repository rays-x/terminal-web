import {modelOptions, prop, Ref, plugin} from '@typegoose/typegoose';
import {_BaseEntity} from './_BaseEntity';
import {defaultModelOptions, defaultSchemaOptions} from '../mongoose.config';
import autopopulate from 'mongoose-autopopulate';
import UserPublicEntity from "./UserPublic";
import ChatMessageEntity, {ChatMessageEntityEntityDefaultSelect} from "./ChatMessage";

class ChatMessageContent extends _BaseEntity {
  @prop()
  public text!: string;
}

class Message extends _BaseEntity {
  @prop({
    ref: () => UserPublicEntity,
    autopopulate: {
      select: [
        'id',
        'name',
        'photos'
      ]
    },
  })
  author?: Ref<UserPublicEntity>;
  @prop({
    type: () => ChatMessageContent
  })
  public content!: ChatMessageContent;
  @prop({
    default: [],
    ref: () => UserPublicEntity,
    autopopulate: false,
  })
  watched!: Ref<UserPublicEntity>[];
}

@plugin(autopopulate)
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
    collection: 'chat'
  }
})
export class ChatEntity extends _BaseEntity {
  @prop({
    default: [],
    ref: () => UserPublicEntity,
    autopopulate: {
      select: [
        'id',
        'name',
        'photos'
      ]
    },
  })
  participants!: Ref<UserPublicEntity>[];
}

export const ChatEntityDefaultSelect = [
  'id',
  'createdAt',
  'updatedAt',
  'participants'
];
export default ChatEntity;
