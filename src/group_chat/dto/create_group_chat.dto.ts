import { ApiProperty } from '@nestjs/swagger';
import { Contacts } from '@/chat-box-shared/contact';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Optional } from '@nestjs/common';

const GroupChatType = Contacts.GroupType;

export class CreateGroupChatBaseDto {
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

export class CreateGroupChatDirectDto extends CreateGroupChatBaseDto {
  @ApiProperty({ example: '68999588daca8983e00ab5af' })
  TargetID: string;
}
export class CreateGroupChatDto extends CreateGroupChatBaseDto {
  @ApiProperty({
    example: ['68999588daca8983e00ab5af', '68999588daca8983e00ab5ag'],
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  memberId: string[];
}
