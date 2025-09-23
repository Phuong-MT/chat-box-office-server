import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { ChatboxService } from './chatbox.service';

@WebSocketGateway()
export class ChatboxGateway {
  constructor(private readonly chatboxService: ChatboxService) {}
}
