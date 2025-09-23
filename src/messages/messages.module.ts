import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesSchema, Messages } from './Schema/messages.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { DBName } from '@/utils/connectDB';
import { MyLogger } from '@/utils/logger';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Messages.getName(),
          schema: MessagesSchema,
        },
      ],
      DBName.CHAT_BOX_DB,
    ),
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MyLogger],
  exports: [MessagesService],
})
export class MessagesModule {}
