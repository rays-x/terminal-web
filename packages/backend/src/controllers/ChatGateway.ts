import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {ChatService} from "../services/Chat";
import {get} from "lodash";
import chatEmitter from "../events/chats";
import {AsyncApiPub, AsyncApiService, AsyncApiSub} from "nestjs-asyncapi";
import {
  WSChatNewChatDto,
  WSChatNewChatMessageDto,
  WSChatNewWatchMessageDto,
  WSChatSendMessageDto,
  WSChatWatchMessagesDto
} from "../dto/Chat";
import {Types} from "mongoose";

@AsyncApiService()
@WebSocketGateway({
  cors: {
    origin: process.env.NODE_ENV === 'development' ?
      '*'
      : [`${process.env.SERVER_URL}`, `${process.env.FRONTEND_URL}`],
  },
  path: '/chats',
  transports: ['websocket'],
  cookie: true
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService
  ) {
    chatEmitter.on('newChat', data => {
      get(data, 'participants', []).forEach((_) => {
        const userId = String(get(_, 'id', ''));
        if (!userId) {
          return;
        }
        this.server.to(userId).emit('newChat', ChatService.formatForIos(data, new Types.ObjectId(userId)))
      })
    })
  }

  async handleConnection(socket: Socket) {
    const userId = await this.chatService.getUserIdFromSocket(socket);
    if (!userId) {
      return;
    }
    socket['userId'] = userId
    socket.join(userId)
  }

  @SubscribeMessage('sendMessage')
  @AsyncApiPub({
    channel: 'sendMessage',
    summary: 'Send message to chat',
    message: {
      name: 'request',
      payload: {
        type: WSChatSendMessageDto,
      },
    },
  })
  async listenForMessages(
    @MessageBody() {message, chatId}: WSChatSendMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const savedMessage = await this.chatService.sendMessageToChat(socket, this.server, chatId, message);
    if (!savedMessage) {
      return
    }
    return savedMessage;
  }

  @SubscribeMessage('readMessage')
  @AsyncApiPub({
    channel: 'readMessages',
    summary: 'Read message from chat',
    message: {
      name: 'request',
      payload: {
        type: WSChatWatchMessagesDto,
      },
    },
  })
  async listenForMessagesRead(
    @MessageBody() {messagesId}: WSChatWatchMessagesDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const savedMessage = await this.chatService.addWatchedToChatMessages(socket, this.server, messagesId);
    if (!savedMessage) {
      return
    }
    return savedMessage;
  }

  @AsyncApiSub({
    channel: 'newChat',
    summary: 'Subscribe to new chat signal',
    message: {
      name: 'response',
      payload: {
        type: WSChatNewChatDto,
      },
    },
  })
  async newChatSignal() {

  }

  @AsyncApiSub({
    channel: 'newChatMessage',
    summary: 'Subscribe to new chat message signal',
    message: {
      name: 'response',
      payload: {
        type: WSChatNewChatMessageDto,
      },
    },
  })
  async newChatMessageSignal() {

  }

  @AsyncApiSub({
    channel: 'newWatchedMessage',
    summary: 'Subscribe to new message watched  signal',
    message: {
      name: 'response',
      payload: {
        type: WSChatNewWatchMessageDto,
      },
    },
  })
  async newWatchMessageSignal() {

  }
}