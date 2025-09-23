import { Injectable } from '@nestjs/common';
import {
  GroupMemberDocument,
  GroupMember,
} from './Schema/group_members.entity';
import { DBName } from '@/utils/connectDB';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ClientSession, Connection, Model } from 'mongoose';
import { CreateGroupMembersDto } from './dto/create_group_members';
import { MyLogger } from '@/utils/logger';
@Injectable()
export class GroupMembersService {
  constructor(
    @InjectModel(GroupMember.getName(), DBName.CHAT_BOX_DB)
    private groupMembers: Model<GroupMemberDocument>,
    @InjectConnection(DBName.CHAT_BOX_DB) // 👈 lấy đúng connection theo tên
    private readonly connection: Connection,
    private logger: MyLogger,
  ) {}

  async createGroupMember(
    members: CreateGroupMembersDto[],
    session?: ClientSession,
  ) {
    const createGroupMember = await this.groupMembers.create(members, {
      session,
      ordered: true,
    });
    return createGroupMember;
  }
}
