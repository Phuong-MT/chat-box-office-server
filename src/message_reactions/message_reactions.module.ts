import { Module } from '@nestjs/common';
import { MessageReactionsService } from './message_reactions.service';
import { MessageReactionsController } from './message_reactions.controller';
import {
  MessageReactionSchema,
  MessageReaction,
} from './Schema/message_reaction.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { DBName } from '@/utils/connectDB';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: MessageReaction.getName(), schema: MessageReactionSchema }],
      DBName.CHAT_BOX_DB,
    ),
  ],
  controllers: [MessageReactionsController],
  providers: [MessageReactionsService],
})
export class MessageReactionsModule {}
