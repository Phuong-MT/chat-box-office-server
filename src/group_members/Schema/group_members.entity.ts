import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { GroupChat } from '@/group_chat/Schema/group_chat.entity';

export enum RoleGroupMember {
  ADMIN = 'ADMIN',
  MANAGEMENT = 'MANAGEMENT',
  MEMBER = 'MEMBER',
}
export type GroupMemberDocument = GroupMember & Document;

@Schema({ timestamps: true })
export class GroupMember {
  private static readonly modelName = 'group-member';

  static getName() {
    return this.modelName;
  }

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: GroupChat.getName(), required: true })
  groupId: string | Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(RoleGroupMember),
    default: RoleGroupMember.MEMBER,
  })
  role: RoleGroupMember;

  @Prop({ type: String })
  lastReadMessageId?: string;
}

export const GroupMemberSchema = SchemaFactory.createForClass(GroupMember);
