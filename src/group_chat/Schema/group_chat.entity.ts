import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum GroupType {
  DIRECT = 'DIRECT',
  GROUPT = 'GROUP',
}

export type GroupChatDocument = GroupChat & Document;
@Schema({ timestamps: true })
export class GroupChat {
  static readonly modelName = 'group-chat';

  static getName() {
    return this.modelName;
  }
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  userCreate: string;

  @Prop({ required: true, default: GroupType.DIRECT })
  type: GroupType;

  @Prop()
  group_avarta: string;
}

export const GroupChatShema = SchemaFactory.createForClass(GroupChat);
