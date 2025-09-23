import { Injectable } from '@nestjs/common';
import {
  CreateGroupChatDirectDto,
  CreateGroupChatDto,
} from './dto/create_group_chat.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { GroupChat, GroupChatDocument } from './Schema/group_chat.entity';
import { DBName } from '@/utils/connectDB';
import { Model, Types } from 'mongoose';
import { Connection } from 'mongoose';
import { GroupMembersService } from '@/group_members/group_members.service';
import { Contacts } from '@/chat-box-shared/contact';
import { generateID } from '@/chat-box-shared/utils';
import { CreateGroupMembersDto } from '@/group_members/dto/create_group_members';
import { MyLogger } from '@/utils/logger';

@Injectable()
export class GroupChatService {
  constructor(
    @InjectModel(GroupChat.getName(), DBName.CHAT_BOX_DB)
    private groupChatModel: Model<GroupChatDocument>,

    @InjectConnection(DBName.CHAT_BOX_DB) // 👈 lấy đúng connection theo tên
    private readonly connection: Connection,

    private groupMemberService: GroupMembersService,

    private logger: MyLogger,
  ) {}

  async createGroupChat(payload: CreateGroupChatDto, userId: string) {
    const session = await this.connection.startSession();
    try {
      session.startTransaction();
      const { name, group_avatar, memberId } = payload;
      const groupType = Contacts.GroupType.GROUP;
      const userCreate = userId;

      // step 1: create group-chat
      const createGroupChat = new this.groupChatModel({
        name,
        userCreate,
        type: groupType,
        group_avatar: group_avatar || '',
      });
      await createGroupChat.save({ session });
      const groupId = createGroupChat._id as Types.ObjectId;
      // step-2: create Admin in group
      const Admin = {
        userId,
        groupId: groupId,
        role: Contacts.RoleGroupMembers.ADMIN,
      } as CreateGroupMembersDto;
      const createGroupMember = await this.groupMemberService.createGroupMember(
        [Admin],
        session,
      );

      // step-3: create members

      const createGroupMembers =
        await this.groupMemberService.createGroupMember(
          memberId.map((id) => ({
            userId: id,
            groupId,
            role: Contacts.RoleGroupMembers.MEMBER,
          })),
          session,
        );

      await session.commitTransaction();

      return createGroupChat;
    } catch (e: any) {
      session.abortTransaction();
      this.logger.error('create group chat error: ', e);
      throw e;
    } finally {
      session.endSession();
    }
  }
  async createGroupChatDirect(
    payload: CreateGroupChatDirectDto,
    userId: string,
  ) {
    const { name, group_avatar, TargetID } = payload;
    const groupType = Contacts.GroupType.DIRECT;
    const createGroupChatDirect = new this.groupChatModel({
      name,
      type: groupType,
      group_avartar: group_avatar || '',
      userCreate: userId,
      userRef: [userId, TargetID],
    });
    return await createGroupChatDirect.save();
  }

  async findGroupById(groupId: string) {
    return await this.groupChatModel.findById(groupId);
  }
}
