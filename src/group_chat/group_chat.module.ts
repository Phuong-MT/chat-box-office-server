import { Module } from '@nestjs/common';
import { GroupChatService } from './group_chat.service';
import { GroupChatController } from './group_chat.controller';

@Module({
  controllers: [GroupChatController],
  providers: [GroupChatService],
})
export class GroupChatModule {}
