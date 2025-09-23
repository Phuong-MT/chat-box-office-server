import { GroupChat } from '@/group_chat/Schema/group_chat.entity';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FileSchemaDocument = File & Document;

@Schema({ timestamps: true })
export class File {
  private static readonly modelName = 'file';

  static getName() {
    return this.modelName;
  }

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  link: string;

  @Prop({ required: true, type: String })
  contentType: string;

  @Prop({ required: true, type: String })
  lastUserIdUpdate: string;

  @Prop({ required: true, type: Types.ObjectId, ref: GroupChat.getName() })
  groupId: string | Types.ObjectId;
}

export const FileSchema = SchemaFactory.createForClass(File);
