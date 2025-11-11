import { GroupChatService } from '@/group_chat/group_chat.service';
import { SendMessageDto } from '@/messages/dto/create_messages.dto';
import { MessagesService } from '@/messages/messages.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatboxService {
  constructor(
    private groupChatService: GroupChatService,
    private messageService: MessagesService,
  ) {}

  // group
  async findGroupById({ groupId }: { groupId: string }) {
    const group = await this.groupChatService.findGroupById(groupId);
    return group;
  }

  // message
  async addMessage({
    groupId,
    userId,
    content,
    frameTime,
  }: {
    groupId: string;
    userId: string;
    content: string;
    frameTime: number;
  }) {
    const data: SendMessageDto = {
      groupId,
      content,
      frameTime,
    };

    return await this.messageService.userSendMessage(data, userId);
  }
}
