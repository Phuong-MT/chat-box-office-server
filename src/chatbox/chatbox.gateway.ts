import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ChatboxService } from './chatbox.service';
import { CreateChatboxDto } from './dto/create-chatbox.dto';
import { UpdateChatboxDto } from './dto/update-chatbox.dto';

@WebSocketGateway()
export class ChatboxGateway {
  constructor(private readonly chatboxService: ChatboxService) {}

  @SubscribeMessage('createChatbox')
  create(@MessageBody() createChatboxDto: CreateChatboxDto) {
    return this.chatboxService.create(createChatboxDto);
  }

  @SubscribeMessage('findAllChatbox')
  findAll() {
    return this.chatboxService.findAll();
  }

  @SubscribeMessage('findOneChatbox')
  findOne(@MessageBody() id: number) {
    return this.chatboxService.findOne(id);
  }

  @SubscribeMessage('updateChatbox')
  update(@MessageBody() updateChatboxDto: UpdateChatboxDto) {
    return this.chatboxService.update(updateChatboxDto.id, updateChatboxDto);
  }

  @SubscribeMessage('removeChatbox')
  remove(@MessageBody() id: number) {
    return this.chatboxService.remove(id);
  }
}
