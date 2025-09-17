import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { MessagesDocument, Messages } from './Schema/messages.entity';
import { DBName } from '@/utils/connectDB';
import { Connection, Model } from 'mongoose';
import { MyLogger } from '@/utils/logger';
@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Messages.getName(), DBName.CHAT_BOX_DB)
    private readonly messageModel: Model<MessagesDocument>,

    @InjectConnection(DBName.CHAT_BOX_DB)
    private readonly connection: Connection,

    private logger: MyLogger,
  ) {}
}
