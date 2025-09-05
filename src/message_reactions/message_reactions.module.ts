import { Module } from '@nestjs/common';
import { MessageReactionsService } from './message_reactions.service';
import { MessageReactionsController } from './message_reactions.controller';

@Module({
  controllers: [MessageReactionsController],
  providers: [MessageReactionsService],
})
export class MessageReactionsModule {}
