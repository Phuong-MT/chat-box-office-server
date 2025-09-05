import { Controller } from '@nestjs/common';
import { MessageReactionsService } from './message_reactions.service';

@Controller('message-reactions')
export class MessageReactionsController {
  constructor(private readonly messageReactionsService: MessageReactionsService) {}
}
