import { Module } from '@nestjs/common';
import { ChatboxService } from './chatbox.service';
import { ChatboxGateway } from './chatbox.gateway';

@Module({
  providers: [ChatboxGateway, ChatboxService],
})
export class ChatboxModule {}
