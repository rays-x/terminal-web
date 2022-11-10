import {
  Body,
  Controller, Get, Param,
  Post, Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import {Authorized} from "../decorators/auth";
import {Language, UserId} from "../decorators/user";
import {Types} from "mongoose";
import {FeedService} from "../services/Feed";
import {Languages} from "../entities/User";
import {FeedActionDto} from "../dto/Feed";
import {ChatService} from "../services/Chat";
import {ChatDto, ChatWithMessagesDto} from "../dto/Chat";

@Controller('/api/rest')
export class ChatController {
  constructor(
    public service: ChatService
  ) {
  }

  @ApiTags('ios-temp')
  @ApiOperation({summary: 'get chats',deprecated: true})
  @ApiBearerAuth('bearer-sid')
  @ApiResponse({
    type: ChatWithMessagesDto,
    isArray: true
  })
  @Get('/chat')
  @Authorized()
  async _chats(
    @UserId() userId: Types.ObjectId,
  ) {
    return this.service.getChats(userId);
  }

  @ApiTags('ios')
  @ApiOperation({summary: 'get chats'})
  @ApiBearerAuth('bearer-sid')
  @ApiResponse({
    type: ChatWithMessagesDto,
    isArray: true
  })
  @Get('/chats')
  @Authorized()
  async chats(
    @UserId() userId: Types.ObjectId,
  ) {
    return this.service.getChats(userId);
  }

  @ApiTags('ios')
  @ApiOperation({summary: 'get chat by id'})
  @ApiBearerAuth('bearer-sid')
  @ApiParam({
    name: 'id',
    type: String
  })
  @ApiResponse({
    type:ChatWithMessagesDto
  })
  @Get('/chat/:id')
  @Authorized()
  async chat(
    @Param('id') chatId: Types.ObjectId,
    @UserId() userId: Types.ObjectId,
  ) {
    return this.service.getChat(userId, chatId);
  }
}
