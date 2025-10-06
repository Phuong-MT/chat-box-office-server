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
import { Contacts } from '@/chat-box-shared/contact';
import { SendMessageDto } from '@/messages/dto/create_messages.dto';
@WebSocketGateway(4001, {
  cors: '*',
  path: '/socket',
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
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage(`${ChatboxGateway.ChatBoxMessages.SEND_MESSAGE}`)
  handleMessage(
    @ConnectedSocket() socket: Socket,
    @ConnectedSocket() client: Socket,
    @MessageBody() body: SendMessageDto,
  ) {
    const { groupId, content, link, file } = body;
    this.logger.log(`Message received from client id: ${client.id}`);
    socket.emit('pong', 'hi');
    return {
      event: 'pong',
      data: 'Wrong data that will make the test fail',
    };
  }
}
