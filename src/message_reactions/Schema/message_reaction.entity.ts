import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Messages } from '@/messages/Schema/messages.entity';

export type MessageReactionDocument = MessageReaction & Document;

@Schema({ timestamps: true })
export class MessageReaction {
  private static readonly modelName = 'message-reaction';

  static getName() {
    return this.modelName;
  }

  @Prop({ required: true, type: Types.ObjectId, ref: Messages.getName() })
  messageId: Types.ObjectId;

  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true, type: String })
  reaction: string;
}

export const MessageReactionSchema =
  SchemaFactory.createForClass(MessageReaction);
