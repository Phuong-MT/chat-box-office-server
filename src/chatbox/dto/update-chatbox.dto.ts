import { PartialType } from '@nestjs/mapped-types';
import { CreateChatboxDto } from './create-chatbox.dto';

export class UpdateChatboxDto extends PartialType(CreateChatboxDto) {
  id: number;
}
