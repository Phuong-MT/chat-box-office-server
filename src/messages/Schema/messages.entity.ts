import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { File } from '@/file_to_chat/Schema/file.entity';
import { Link } from '@/link_share_post/Schema/link.entity';
import { GroupChat } from '@/group_chat/Schema/group_chat.entity';

export type MessagesDocument = Document & Messages;
@Schema({ timestamps: true })
export class Messages {
  private static readonly modelName = 'messages';

  static getName() {
    return this.modelName;
  }

  @Prop({ required: true, type: Types.ObjectId, ref: GroupChat.getName() })
  groupChatId: Types.ObjectId;

  //userId
  @Prop({ required: true, type: String })
  sender: string;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ required: false, type: [Object] })
  media: [Object];

  @Prop({ required: false, type: Types.ObjectId, ref: File.getName() })
  file: Types.ObjectId;

  @Prop({ required: false, type: Types.ObjectId, ref: Link.getName() })
  link: Types.ObjectId;

  @Prop({ required: false, type: Types.ObjectId, ref: Messages.getName() })
  respondTo: Types.ObjectId;

  @Prop({ required: false, type: [String] })
  userSeen: [string];

  @Prop({ required: false, type: [String] })
  reaction_message: [string];

  @Prop({ required: false, type: Boolean, default: false })
  isRetrieve: boolean;

  @Prop({ required: true, type: Number })
  frameTime: number;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);
