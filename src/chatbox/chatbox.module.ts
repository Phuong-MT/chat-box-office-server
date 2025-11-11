import { forwardRef, Module } from '@nestjs/common';
import { ChatboxService } from './chatbox.service';
import { ChatboxGateway } from './chatbox.gateway';
import { MyLogger } from '@/utils/logger';
import { PassportModule } from '@nestjs/passport';
import { WsStrategy } from '@/auth/passport/chatbox.middleware';
import { MessagesService } from '@/messages/messages.service';
import { GroupChatService } from '@/group_chat/group_chat.service';
import { GroupChatModule } from '@/group_chat/group_chat.module';
import { MessagesModule } from '@/messages/messages.module';

@Module({
  imports: [
    PassportModule.register({}),
    forwardRef(() => GroupChatModule),
    forwardRef(() => MessagesModule),
  ],
  providers: [ChatboxGateway, ChatboxService, MyLogger, WsStrategy],
})
export class ChatboxModule {}
