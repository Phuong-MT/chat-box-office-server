import { Type } from 'class-transformer';
import {
  IsString,
  IsObject,
  ValidateNested,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

class ChatContentDto {
  @IsString()
  @IsNotEmpty()
  localContentId: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}

class FrameMessageDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsNumber()
  @IsNotEmpty()
  time: number;
}

export class SendMessageGateWayDto {
  @ValidateNested()
  @Type(() => ChatContentDto)
  @IsObject()
  chatContent: ChatContentDto;

  @IsString()
  @IsNotEmpty()
  groupId: string;

  @ValidateNested()
  @Type(() => FrameMessageDto)
  @IsObject()
  frameMessage: FrameMessageDto;
}
