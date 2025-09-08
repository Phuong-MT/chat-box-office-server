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
import { LinkModule } from './link/link.module';
import { FileModule } from './file/file.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
    ConnectDBModule,
    UserModule,
    AuthModule,
    ChatboxModule,
    GroupChatModule,
    GroupMembersModule,
    MessagesModule,
    MessageReactionsModule,
    LinkModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    MyLogger,
    Logger,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
