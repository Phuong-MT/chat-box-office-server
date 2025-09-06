import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const FileSchema = SchemaFactory.createForClass(File);
