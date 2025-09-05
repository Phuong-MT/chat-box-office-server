import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MyLogger } from './utils/logger';
import { ConfigModule } from '@nestjs/config';
import { ConnectDBModule } from './utils/connectDB';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatboxModule } from './chatbox/chatbox.module';
import { GroupChatModule } from './group_chat/group_chat.module';
import { GroupMembersModule } from './group_members/group_members.module';
import { MessagesModule } from './messages/messages.module';
import { MessageReactionsModule } from './message_reactions/message_reactions.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConnectDBModule,
    UserModule,
    AuthModule,
    ChatboxModule,
    GroupChatModule,
    GroupMembersModule,
    MessagesModule,
    MessageReactionsModule,
  ],
  controllers: [AppController],
  providers: [MyLogger, Logger, AuthModule],
})
export class AppModule {}
