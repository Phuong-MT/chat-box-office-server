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
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '@/auth/passport/chatbox.guard';
@WebSocketGateway(4001, {
  cors: '*',
  path: `/socket/${NAME_SPACE_SOCKET.CHAT_BOX}`,
  transports: ['websocket'],
})
export class ChatboxGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly logger: MyLogger,
    private chatBoxServices: ChatboxService,
  ) {}
  static ChatBoxMessages = Contacts.SUBSCRIBE_MESSAGE.CHAT_BOX;

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client id: ${client.id} connected`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('ping')
  handleMessage(
    @ConnectedSocket() socket: Socket,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(`Message received from client id: ${client.id}`);
    socket.emit('pong', 'hi');
    return {
      event: 'pong',
      data: 'Wrong data that will make the test fail',
    };
  }
}
