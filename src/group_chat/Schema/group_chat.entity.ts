import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Contacts } from '@/chat-box-shared/contact';

const GroupType = Object.values(Contacts.GroupType);

export type GroupChatDocument = GroupChat & Document;
@Schema({ timestamps: true })
export class GroupChat {
  private static readonly modelName = 'group-chat';

  static getName() {
    return this.modelName;
  }
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  userCreate: string;

  @Prop({ required: true, enum: GroupType, default: Contacts.GroupType.DIRECT })
  type: String;

  @Prop()
  group_avarta: string;
}

export const GroupChatShema = SchemaFactory.createForClass(GroupChat);
