import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatboxService } from './chatbox.service';
import { MyLogger } from '@/utils/logger';
import { Contacts, NAME_SPACE_SOCKET } from '@/chat-box-shared/contact';
import { BadGatewayException, UseGuards, ValidationPipe } from '@nestjs/common';
import { WsJwtGuard } from '@/auth/passport/chatbox.guard';
import * as cookie from 'cookie';
import { serviceJWT } from '@/utils/jwt';
import { generateID } from '@/chat-box-shared/utils';
import { SendMessageGateWayDto } from './dto/send-message.dto';
@WebSocketGateway(4001, {
  cors: '*',
  path: `/socket`,
  namespace: `/${NAME_SPACE_SOCKET.CHAT_MESSAGE_SCREEN}`,
  transports: ['websocket'],
})
export class ChatboxGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly logger: MyLogger,
    private chatBoxServices: ChatboxService,
  ) {}
  static ChatBoxMessages = Contacts.SUBSCRIBE_MESSAGE.CHAT_MESSAGE_SCREEN;

  @WebSocketServer() io: Server;
  onModuleInit() {}
  afterInit(server: Server) {
    server.use((socket, next) => {
      try {
        const cookies = cookie.parse(socket.handshake.headers.cookie || '');
        const token = cookies[Contacts.jwt.ACCESS_TOKEN];

        if (!token) {
          return next(new Error('Unauthorized: No token provided'));
        }

        const user = serviceJWT.decode(token);
        if (!user) {
          return next(new Error('Forbidden: Invalid token'));
        }

        (socket.data as any).user = user;
        next();
      } catch (err) {
        next(new Error('Forbidden: Invalid token'));
      }
    });
    this.logger.log('Socket.IO initialized with JWT auth');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client id: ${client.id} connected`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage('ping')
  handlePingMessage(@ConnectedSocket() client: Socket) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.io.emit('pong', 'hello');
    return {
      event: 'pong',
      data: 'hello',
    };
  }

  @SubscribeMessage(`${ChatboxGateway.ChatBoxMessages.JOIN_LIVE_GROUPCHAT}`)
  handleJoinGroupChat(
    @ConnectedSocket() client: Socket,
    @MessageBody(new ValidationPipe()) body: any,
  ) {
    const { groupId } = body;

    if (!groupId) {
      return { success: false, error: 'groupId is required' };
    }

    try {
      client.join(groupId);
      this.logger.log(`User ${client.id} joined room ${groupId}`);
      return { success: true, groupId };
    } catch (err) {
      this.logger.error(err);
      return { success: false, error: err.message };
    }
  }

  @SubscribeMessage(`${ChatboxGateway.ChatBoxMessages.LEAVE_LIVE_GROUPCHAT}`)
  handleLeaveGroupChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: any,
  ) {
    const { groupId } = body;

    if (!groupId) {
      return;
    }

    if (client.rooms.has(groupId)) {
      client.leave(groupId);
    }
    return;
  }

  @SubscribeMessage(`${ChatboxGateway.ChatBoxMessages.SEND_MESSAGE}`)
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: SendMessageGateWayDto,
  ) {
    const { chatContent, frameMessage, groupId } = body;
    const { text, localContentId } = chatContent;
    const { _id, time } = frameMessage;
    const user = client.data.user;
    const groupRes = await this.chatBoxServices.findGroupById({ groupId });

    if (!groupRes) {
      console.log(1);
      return { success: false, error: 'group is not found' };
    }

    const messages = await this.chatBoxServices.addMessage({
      groupId,
      userId: user._id,
      content: text,
      frameTime: time,
    });

    if (!messages) {
      return { success: false, error: 'send message error' };
    }

    const contentId = Array.isArray(messages.message)
      ? messages.message[0]?._id
      : messages.message?._id;
    return { success: true, contentId: 1 };
  }
}
