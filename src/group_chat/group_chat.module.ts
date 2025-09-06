import { Module } from '@nestjs/common';
import { GroupChatService } from './group_chat.service';
import { GroupChatController } from './group_chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupChatShema, GroupChat } from './Schema/group_chat.entity';
import { DBName } from '@/utils/connectDB';
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: GroupChat.getName(), schema: GroupChatShema }],
      DBName.CHAT_BOX_DB,
    ),
  ],
  controllers: [GroupChatController],
  providers: [GroupChatService],
})
export class GroupChatModule {}
