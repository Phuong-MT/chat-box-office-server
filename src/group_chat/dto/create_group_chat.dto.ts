import { ApiProperty } from '@nestjs/swagger';
import { Contacts } from '@/chat-box-shared/contact';
import { IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Optional } from '@nestjs/common';

const GroupChatType = Contacts.GroupType;

export class CreateGroupChatDto {
  @ApiProperty({ example: 'example' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: GroupChatType })
  @IsEnum(Contacts.GroupType, {
    message: 'type must be DIRECT or GROUP',
  })
  @IsNotEmpty()
  groupType: string;

  @IsOptional()
  group_avatar: string;
}
