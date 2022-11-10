import {modelOptions, prop, Ref, plugin, index} from '@typegoose/typegoose';
import {_BaseEntity} from './_BaseEntity';
import {defaultModelOptions, defaultSchemaOptions} from '../mongoose.config';
import autopopulate from 'mongoose-autopopulate';
import UserPublicEntity from "./UserPublic";
import ChatEntity from "./Chat";

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
  }
})
class ChatMessageContent extends _BaseEntity {
  @prop()
  public text!: string;
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
    collection: 'chatMessage'
  }
})
@index(
  {chatId: 1},
  {
    background: true
  }
)
export class ChatMessageEntity extends _BaseEntity {
  @prop({
    ref: () => UserPublicEntity,
    autopopulate: false,
  })
  chatId!: Ref<ChatEntity>;
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

export const ChatMessageEntityEntityDefaultSelect = [
  'id',
  'createdAt',
  'updatedAt',
  'author',
  'content',
  'watched',
];
export default ChatMessageEntity;
