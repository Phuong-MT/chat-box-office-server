import { Module } from '@nestjs/common';
import { ChatboxService } from './chatbox.service';
import { ChatboxGateway } from './chatbox.gateway';
import { MyLogger } from '@/utils/logger';

@Module({
  providers: [ChatboxGateway, ChatboxService, MyLogger],
})
export class ChatboxModule {}
