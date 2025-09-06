import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { File } from '@/file/Schema/file.entity';
import { Link } from '@/link/Schema/link.entity';
import { GroupChat } from '@/group_chat/Schema/group_chat.entity';

@Schema({ timestamps: true })
export class Messages {
  private static readonly modelName = 'messages';

  static getName() {
    return this.modelName;
  }

  @Prop({ required: true, type: Types.ObjectId, ref: GroupChat.getName() })
  groupChatId: Types.ObjectId;

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
  usesSeen: [string];

  @Prop({ required: false, type: Boolean, default: false })
  isRetrieve: boolean;
}
