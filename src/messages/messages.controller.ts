import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth-guard';
import { HttpStatusError } from '@/utils/http-error/http-error-mess';
import { GetMessageByGroupID, SendMessageDto } from './dto/create_messages.dto';
import { GroupChatService } from '@/group_chat/group_chat.service';

@Controller('/api/messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly groupChatService: GroupChatService,
  ) {}
  @Get('get-message-by-group-id')
  async getMessageByGroupId(@Query() query: any) {
    const { groupId } = query;
    if (!groupId) {
      throw new HttpStatusError('groupId not found', 404);
    }

    const { message_late, pre_message } = query;

    const groupRes = await this.groupChatService.findGroupById(groupId);

    if (message_late) {
      const data =
        await this.messagesService.getMessageLateByGroupIdV2(groupId);

      return data;
    }
    if (pre_message && !message_late) {
      return await this.messagesService.getMessagePreMessageId(
        pre_message,
        groupId,
      );
    }

    return;
  }

  @Post('send-message')
  async sendMessage(
    @Query() query: any,
    @Body() data: SendMessageDto,
    @Req() req: any,
  ) {
    const { groupId } = query;
    const userId = req.user?._id;
    if (!groupId) {
      throw new HttpStatusError('groupId not found', 404);
    }

    if (!userId) {
      throw new HttpStatusError('user not exit', 400);
    }

    const { content, link, file, frameTime } = data;

    return await this.messagesService.userSendMessage(
      { groupId, content, link, file, frameTime },
      userId,
    );
  }
}
