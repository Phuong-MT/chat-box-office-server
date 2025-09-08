import { Injectable } from '@nestjs/common';
import { CreateGroupChatDto } from './dto/create_group_chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GroupChat, GroupChatDocument } from './Schema/group_chat.entity';
import { DBName } from '@/utils/connectDB';
import { Model } from 'mongoose';
import { generateID } from '@/chat-box-shared/utils';
@Injectable()
export class GroupChatService {
  constructor(
    @InjectModel(GroupChat.getName(), DBName.CHAT_BOX_DB)
    private groupChatModel: Model<GroupChatDocument>,
  ) {}
  async createGroupChat(payload: CreateGroupChatDto, userId: string) {
    const { name, groupType, group_avatar } = payload;
    const userCreate = userId;
    const createGroupChat = new this.groupChatModel({
      name,
      userCreate,
      type: groupType,
      group_avartar: group_avatar || '',
    });

    return createGroupChat.save();
  }
}
