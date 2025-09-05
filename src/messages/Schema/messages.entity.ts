import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { File } from '@/file/Schema/file.entity';

@Schema({ timestamps: true })
export class Messages {
  private static readonly modelName = 'messages';

  static getName() {
    return this.modelName;
  }

  @Prop({ required: true, type: String })
  sender: string;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ required: false, type: Object })
  media: Object;

  @Prop({ required: false, type: File, ref: File.getName() })
  file: string;
}
