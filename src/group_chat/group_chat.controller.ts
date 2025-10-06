import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GroupChatService } from './group_chat.service';
import {
  CreateGroupChatDirectDto,
  CreateGroupChatDto,
} from './dto/create_group_chat.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth-guard';
import { HttpStatusError } from '@/utils/http-error/http-error-mess';
import { Contacts } from '@/chat-box-shared/contact';
import { MyLogger } from '@/utils/logger';

@Controller('/api/group-chat')
@UseGuards(JwtAuthGuard)
export class GroupChatController {
  constructor(
    private readonly groupChatService: GroupChatService,
    private logger: MyLogger,
  ) {}
  // create group-chat

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tạo group chat thành công',
    schema: {
      example: {
        _id: '68be8b3b9a7df150862b1fe5',
        name: 'example',
        userCreate: '1757317947184-39638953',
        type: 'GROUP',

        group_avarta: '',
        createdAt: '2025-09-08T07:52:27.187+00:00',
        updatedAt: '2025-09-08T07:52:27.187+00:00',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Người tạo không tồn tại',
    schema: {
      example: {
        statusCode: 400,
        message: 'Người tạo không tồn tại',
      },
    },
  })
  @Post('/create-group-chat/group')
  async createGroupChat(
    @Body() payload: CreateGroupChatDto,
    @Request() req: any,
  ) {
    const user = req.user;
    const userId = user._id;
    if (!userId || typeof userId != 'string') {
      throw new HttpStatusError('Người tạo không tồn tại', 400);
    }
    return this.groupChatService.createGroupChat(
      payload as CreateGroupChatDto,
      userId,
    );
  }

  @Post('/create-goup-chat/direct')
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: {
      example: {
        _id: '68be8b3b9a7df150862b1fe5',
        name: 'example',
        userCreate: '1757317947184-39638953',
        type: 'DIRECT',
        group_avarta: '',
        createdAt: '2025-09-08T07:52:27.187+00:00',
        updatedAt: '2025-09-08T07:52:27.187+00:00',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Người tạo không tồn tại',
    schema: {
      example: {
        statusCode: 400,
        message: 'Người tạo không tồn tại',
      },
    },
  })
  async createGroupChatDirect(
    @Body() payload: CreateGroupChatDirectDto,
    @Request() req: any,
  ) {
    const user = req.user;
    const userId = user?._id;
    if (!userId || typeof userId != 'string') {
      throw new HttpStatusError('Người tạo không tồn tại', 400);
    }
    return this.groupChatService.createGroupChatDirect(payload, userId);
  }
}
