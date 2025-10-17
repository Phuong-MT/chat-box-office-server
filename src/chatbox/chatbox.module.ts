import { Module } from '@nestjs/common';
import { ChatboxService } from './chatbox.service';
import { ChatboxGateway } from './chatbox.gateway';
import { MyLogger } from '@/utils/logger';
import { PassportModule } from '@nestjs/passport';
import { WsStrategy } from '@/auth/passport/chatbox.middleware';

@Module({
  imports: [PassportModule.register({})],
  providers: [ChatboxGateway, ChatboxService, MyLogger, WsStrategy],
})
export class ChatboxModule {}
