import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateGroupChatBaseDto {
  @ApiProperty({ example: 'example' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  group_avatar: string;
}

export class CreateGroupChatDirectDto extends CreateGroupChatBaseDto {
  @ApiProperty({ example: '68999588daca8983e00ab5af' })
  @IsString()
  @IsNotEmpty()
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
