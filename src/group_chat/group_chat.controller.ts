import { Controller } from '@nestjs/common';
import { GroupChatService } from './group_chat.service';

@Controller('group-chat')
export class GroupChatController {
  constructor(private readonly groupChatService: GroupChatService) {}
}
