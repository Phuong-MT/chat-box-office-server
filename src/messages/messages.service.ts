import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { MessagesDocument, Messages } from './Schema/messages.entity';
import { DBName } from '@/utils/connectDB';
import { Connection, Model, Types } from 'mongoose';
import { MyLogger } from '@/utils/logger';
import {
  MessageResponseDto,
  MessageResponseDtoV2,
} from './dto/message-response.dto';
import { SendMessageDto } from './dto/create_messages.dto';
import { time } from 'console';
import { generateID } from '@/chat-box-shared/utils';
@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Messages.getName(), DBName.CHAT_BOX_DB)
    private readonly messageModel: Model<MessagesDocument>,

    @InjectConnection(DBName.CHAT_BOX_DB)
    private readonly connection: Connection,

    private logger: MyLogger,
  ) {}
  async getMessageLateByGroupId(
    groupId: string,
  ): Promise<MessageResponseDto | null> {
    const messages = await this.messageModel
      .find({ groupChatId: groupId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    if (!messages.length) return null;

    const sortedMessages = messages.reverse();

    return {
      groupId,
      message: sortedMessages.map((e) => {
        return {
          _id: e._id.toString(),
          content: e.content,
          sender: e.sender.toString(),
          link: e.link?.toString(),
          file: e.file?.toString(),
          reaction: e.reaction_message ?? [],
          respondTo: e.respondTo?.toString(),
          userSeen: e.userSeen ?? [],
          isRetrieve: e.isRetrieve ?? false,
        };
      }),
    };
  }

  async getMessagePreMessageId(
    messageId: string,
    groupId: string,
  ): Promise<(MessageResponseDto & { hasMore: boolean }) | null> {
    const query: any = {};
    if (messageId) {
      query._id = { $lt: new Types.ObjectId(messageId) };
      query.groupChatId = groupId;
    }

    const messages = await this.messageModel
      .find(query)
      .sort({ _id: -1 })
      .limit(10)
      .lean();

    const messagesReverse = messages.reverse();
    const hasMore = messagesReverse.length === 10;
    return {
      groupId,
      message: messagesReverse.map((e) => {
        return {
          _id: e._id.toString(),
          content: e.content,
          sender: e.sender.toString(),
          link: e.link?.toString(),
          file: e.file?.toString(),
          reaction: e.reaction_message ?? [],
          respondTo: e.respondTo?.toString(),
          userSeen: e.userSeen ?? [],
          isRetrieve: e.isRetrieve ?? false,
        };
      }),
      hasMore,
    };
  }

  async userSendMessage(
    data: SendMessageDto,
    userId: string,
  ): Promise<MessageResponseDto | null> {
    const { groupId, content, link, file, frameTime, isRetrieve } = data;
    const message = new this.messageModel({
      groupChatId: groupId,
      sender: userId,
      content,
      link,
      file,
      isRetrieve,
      frameTime,
    });
    await message.save();
    return {
      groupId,
      message: {
        _id: message._id as string,
        content: message.content,
        sender: message.sender.toString(),
        link: message.link?.toString(),
        file: message.file?.toString(),
        reaction: message.reaction_message ?? [],
        respondTo: message.respondTo?.toString(),
        userSeen: message.userSeen ?? [],
        isRetrieve: message.isRetrieve ?? false,
        frameTime: message.frameTime ?? -1,
      },
    };
  }
  async getMessageLateByGroupIdV2(groupId: string): Promise<any | null> {
    const agg = [
      { $match: { groupChatId: groupId } },
      { $sort: { frameTime: 1, createdAt: 1 } as any },
      {
        $group: {
          _id: '$frameTime',
          timeChat: { $first: '$frameTime' },
          messages: {
            $push: {
              _id: { $toString: '$_id' },
              text: '$content',
              userId: '$sender',
            },
          },
        },
      },
      { $sort: { timeChat: 1 } },
      { $limit: 50 },
    ];

    const framesRaw = await this.messageModel.aggregate(agg);

    if (!framesRaw.length) return null;

    const screenMessages = framesRaw.map((frame) => {
      type MessageContent = { _id: string; text: string };
      type UserGroupMessage = {
        _id: string;
        userId: string;
        contents: MessageContent[];
      };

      const messages: UserGroupMessage[] = [];
      let lastUserId: string | null = null;
      let currentMessage: UserGroupMessage | null = null;

      for (const msg of frame.messages) {
        if (msg.userId !== lastUserId) {
          if (currentMessage) {
            messages.push(currentMessage);
          }
          currentMessage = {
            _id: generateID(),
            userId: msg.userId,
            contents: [],
          };
        }
        currentMessage?.contents.push({ _id: msg._id, text: msg.text });
        lastUserId = msg.userId;
      }
      if (currentMessage) {
        messages.push(currentMessage);
      }

      return {
        _id: generateID(),
        timeChat: frame.timeChat,
        messages,
      };
    });

    return {
      groupId,
      frames: screenMessages,
    };
  }
}
