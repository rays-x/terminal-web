import {
  IsDateString,
  IsMongoId, IsString,
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Types} from "mongoose";


export enum ChatMessageDirection {
  incoming = 'incoming',
  outgoing = 'outgoing'
}

class ChatParticipantDto {
  @ApiProperty({type: String})
  readonly id!: Types.ObjectId
  @ApiProperty()
  readonly name!: string
  @ApiProperty()
  readonly image_url!: string
}

export class ChatDto {
  @ApiProperty({type: String})
  readonly id!: Types.ObjectId
  @ApiProperty()
  readonly createdAt!: Date
  @ApiProperty()
  readonly updatedAt!: Date
  @ApiProperty()
  readonly participant!: ChatParticipantDto
}

export class ChatMessageContentDto {
  @ApiProperty()
  readonly text!: string
}

export class ChatMessageDto {
  @ApiProperty({type: String})
  readonly id!: Types.ObjectId
  @ApiProperty()
  readonly createdAt!: Date
  @ApiProperty()
  readonly updatedAt!: Date
  @ApiProperty({
    type: String,
    isArray: true
  })
  readonly watched!: Types.ObjectId[]
  @ApiProperty()
  readonly content!: ChatMessageContentDto
  @ApiProperty({
    enum: ChatMessageDirection
  })
  readonly direction!: ChatMessageDirection
}

export class ChatWithMessagesDto extends ChatDto {
  @ApiProperty({
    isArray: true
  })
  readonly messages!: ChatMessageDto
}

export class WSChatSendMessageDto {
  @IsMongoId()
  @ApiProperty({
    type: String,
  })
  readonly chatId!: Types.ObjectId
  @IsString()
  @ApiProperty({
    type: String
  })
  readonly message!: string;
}

export class WSChatWatchMessagesDto {
  @IsMongoId({
    each: true
  })
  @ApiProperty({
    type: String,
    isArray: true
  })
  readonly messagesId!: Types.ObjectId[]
}

export class WSChatNewChatDto extends ChatDto {
}

export class WSChatNewChatMessageDto {
  @ApiProperty({type: String})
  readonly chatId!: Types.ObjectId
  @ApiProperty()
  readonly message!: ChatMessageDto;
}

export class WSChatNewWatchMessageDto {
  @ApiProperty({type: String})
  readonly chatId!: Types.ObjectId
  @ApiProperty()
  readonly message!: ChatMessageDto;
}