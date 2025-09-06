import { Module } from '@nestjs/common';
import { GroupMembersService } from './group_members.service';
import { GroupMembersController } from './group_members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupMemberSchema, GroupMember } from './Schema/group_members.entity';
import { DBName } from '@/utils/connectDB';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: GroupMember.getName(), schema: GroupMemberSchema }],
      DBName.CHAT_BOX_DB,
    ),
  ],
  controllers: [GroupMembersController],
  providers: [GroupMembersService],
})
export class GroupMembersModule {}
