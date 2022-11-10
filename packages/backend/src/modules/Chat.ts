import {Module}              from '@nestjs/common';
import {TypegooseModule}     from 'nestjs-typegoose';
import {ChatGateway} from "../controllers/ChatGateway";
import {ChatService} from "../services/Chat";
import ChatEntity from "../entities/Chat";
import UserPublicEntity from "../entities/UserPublic";
import {ChatController} from "../controllers/Chat";
import ChatMessageEntity from "../entities/ChatMessage";

@Module({
  imports:[TypegooseModule.forFeature([ChatEntity,UserPublicEntity,ChatMessageEntity])],
  providers:[ChatGateway,ChatService],
  exports:[ChatService],
  controllers:[ChatController]
})
export class ChatModule{
}
