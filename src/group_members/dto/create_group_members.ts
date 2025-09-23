import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Contacts } from '@/chat-box-shared/contact';

const RoleGroupMembers = Contacts.RoleGroupMembers;

export class CreateGroupMembersDto {
  @ApiProperty({ example: 'abcxyz' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'afaasrgs' })
  @IsString()
  groupId: string | Types.ObjectId;

  @ApiProperty({ enum: RoleGroupMembers, example: 'MEMBER' })
  @IsString()
  role: string;
}
