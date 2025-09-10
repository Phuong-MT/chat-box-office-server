import { ApiProperty } from '@nestjs/swagger';
import {} from 'class-validator';
import { Types } from 'mongoose';
import { Contacts } from '@/chat-box-shared/contact';

const RoleGroupMembers = Contacts.RoleGroupMembers;

export class CreateGroupMembersDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  groupId: string | Types.ObjectId;

  @ApiProperty({ enum: RoleGroupMembers })
  role: string;
}
