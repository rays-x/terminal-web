import {Injectable} from '@nestjs/common';
import {InjectModel} from "nestjs-typegoose";
import {ReturnModelType} from "@typegoose/typegoose";
import ChatEntity from "../entities/Chat";
import {Socket} from "socket.io";
import signature from 'cookie-signature'
import {get} from "lodash";
import {InjectRedisClient} from "nestjs-ioredis-tags";
import Redis from "ioredis";
import UserPublicEntity from "../entities/UserPublic";
import {Types} from "mongoose";
import {ChatMessageDirection} from "../dto/Chat";
import ChatMessageEntity, {ChatMessageEntityEntityDefaultSelect} from "../entities/ChatMessage";

export function unSignToken(token) {
  return signature.unsign(decodeURIComponent(token).slice(2), process.env.COOKIE_SECRET)
}

@Injectable()
export class ChatService {

  constructor(
    @InjectModel(ChatEntity) private readonly repoChat: ReturnModelType<typeof ChatEntity>,
    @InjectModel(ChatMessageEntity) private readonly repoChatMessage: ReturnModelType<typeof ChatMessageEntity>,
    @InjectModel(UserPublicEntity) private readonly repoUser: ReturnModelType<typeof UserPublicEntity>,
    @InjectRedisClient('ray.sx') private readonly redisClient: Redis
  ) {
  }

  async getUserIdFromSocket(socket: Socket) {
    const token = unSignToken(get(socket.handshake.headers, 'authorization', '').replace(/^Bearer\s/, ''))
    if (!token) {
      /*throw new WsException({
          code: 0,
          message: 'Invalid credentials.'
      });*/
      return undefined;
    }
    const userId = get(JSON.parse(await this.redisClient.get(`sess:${token}`) || 'null'), 'user.id')
    if (!userId) {
      /*throw new WsException({
          code: 0,
          message: 'Invalid credentials.'
      });*/
      return undefined;
    }
    return userId
  }

  async sendMessageToChat(socket: Socket, server, chatId: Types.ObjectId, text: string): Promise<any> {
    const userId = get(socket, 'userId');
    if (!userId) {
      return;
    }
    try {
      const message = await this.repoChatMessage.create({
        chatId,
        author: userId,
        content: {
          text
        },
        watched: [],
      })
      const participants = get(await this.repoChat.findById(chatId).select('participants'), 'participants', []);
      participants.filter(_ => _.id !== socket['userId']).forEach(_ => {
        const {chatId, ...messageSocket} = message
        server.to(_.id).emit('newChatMessage', {
          chatId: chatId,
          message: get(ChatService.formatForIos({
            messages: [messageSocket]
          }, _.id), 'messages.0')
        })
      })
      return message
    } catch (e) {
      console.error(e)
    }
  }

  async addWatchedToChatMessages(
    socket: Socket,
    server,
    messages: Types.ObjectId[]): Promise<any> {
    const userId = get(socket, 'userId');
    if (!userId) {
      return;
    }
    try {
      await Promise.all(messages.map(async messageId => {
        const message = await this.repoChatMessage.findByIdAndUpdate(messageId, {
          $push: {
            watched: userId
          }
        }, {
          new: true
        })
        const participants = get(await this.repoChat.findById(message.chatId).select('participants'), 'participants', []);
        participants.filter(_ => _.id !== socket['userId']).forEach(_ => {
          const {chatId, ...messageSocket} = message
          server.to(_.id).emit('newWatchedMessage', {
            chatId: chatId,
            message: get(ChatService.formatForIos({
              messages: [messageSocket]
            }, _.id), 'messages.0')
          })
        })
      }))
    } catch (e) {
      console.error(e)
    }
  }

  async getChats(userId: Types.ObjectId): Promise<ChatEntity[]> {
    const chats = await Promise.all((await this.repoChat.find({
      participants: {
        $elemMatch: {
          $eq: new Types.ObjectId(userId)
        }
      }
    }).sort('-updatedAt')).map(async (_) => {
      const chat = 'toJSON' in _ ? _.toJSON() : _
      const messages = (await this.repoChatMessage.find({
        chatId: chat.id
      })
        // .limit(4)
        .select(ChatMessageEntityEntityDefaultSelect)
        .sort('-createdAt')).map(_ => 'toJSON' in _ ? _.toJSON() : _)
      return {
        ...chat,
        messages
      }
    }))

    return ChatService.formatForIos(chats, userId)
  }

  async getChat(userId: Types.ObjectId, chatId: Types.ObjectId): Promise<ChatEntity> {
    const _chat = await this.repoChat.findOne({
      id: new Types.ObjectId(chatId),
      participants: {
        $elemMatch: {
          $eq: new Types.ObjectId(userId)
        }
      }
    })
    const chat = 'toJSON' in _chat ? _chat.toJSON() : _chat
    const messages = (await this.repoChatMessage.find({
      chatId: chat.id
    })
      // .limit(4)
      .select(ChatMessageEntityEntityDefaultSelect)
      .sort('-createdAt')).map(_ => 'toJSON' in _ ? _.toJSON() : _)
    return ChatService.formatForIos({
      ...chat,
      messages
    }, userId)
  }

  async blockChat(chatId: string): Promise<any> {

  }

  static formatForIos(data: Object & any | Object[], userId: Types.ObjectId) {
    return Array.isArray(data)
      ? data.map(_ => ChatService.formatForIos(_, userId))
      : Object.fromEntries(Object.entries('toJSON' in data ? data.toJSON() : data).reduce((prev, [key, value]) => {
        switch (key) {
          case 'participants': {
            const {photos, ...participant} = (value as any[]).find(_ => {
              return String(get(_, 'id')) !== String(userId)
            }) || {};
            return [...prev, ['participant', {
              ...participant,
              image_url: get(photos, '0.url', null)
            }]]
          }
          case 'messages': {
            return [...prev, [key, (value as any[]).map(({_id: id, author, content, ..._}) => ({
              id,
              ..._,
              content,
              direction: String(get(author, 'id')) === String(userId)
                ? ChatMessageDirection.outgoing
                : ChatMessageDirection.incoming
            }))]]
          }
          default: {
            return [...prev, [key, value]];
          }
        }
      }, []))
  }
}