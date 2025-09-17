import { forwardRef, Module } from '@nestjs/common';
import { GroupChatService } from './group_chat.service';
import { GroupChatController } from './group_chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupChatShema, GroupChat } from './Schema/group_chat.entity';
import { DBName } from '@/utils/connectDB';
import { GroupMembersModule } from '@/group_members/group_members.module';
import { MyLogger } from '@/utils/logger';
import { MessagesModule } from '@/messages/messages.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: GroupChat.getName(), schema: GroupChatShema }],
      DBName.CHAT_BOX_DB,
    ),
    forwardRef(() => GroupMembersModule),
    forwardRef(() => MessagesModule),
  ],
  controllers: [GroupChatController],
  providers: [GroupChatService, MyLogger],
})
export class GroupChatModule {}
