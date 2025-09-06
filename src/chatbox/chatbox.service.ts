import { Injectable } from '@nestjs/common';
import { CreateChatboxDto } from './dto/create-chatbox.dto';
import { UpdateChatboxDto } from './dto/update-chatbox.dto';

@Injectable()
export class ChatboxService {
  create(createChatboxDto: CreateChatboxDto) {
    return 'This action adds a new chatbox';
  }

  findAll() {
    return `This action returns all chatbox`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatbox`;
  }

  update(id: number, updateChatboxDto: UpdateChatboxDto) {
    return `This action updates a #${id} chatbox`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatbox`;
  }
}
