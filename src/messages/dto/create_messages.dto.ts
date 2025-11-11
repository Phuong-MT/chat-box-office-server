import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMessageBaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  groupId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsOptional()
  link?: string;

  @ApiProperty()
  @IsOptional()
  file?: string;

  @ApiProperty()
  @IsNumber()
  frameTime: number;
}
export class SendMessageDto extends CreateMessageBaseDto {
  @ApiProperty()
  isRetrieve?: boolean;
}

export class GetMessageByGroupID {
  @ApiProperty()
  @IsOptional()
  message_late?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pre_message?: string; // pre-message to get
}
