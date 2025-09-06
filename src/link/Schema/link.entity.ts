import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LinkSchemaDocument = Link & Document;

@Schema({ timestamps: true })
export class Link {
  private static readonly modelName = 'link';

  static getName() {
    return this.modelName;
  }

  //messages id if have
  @Prop({ required: false, type: Types.ObjectId })
  targetId: Types.ObjectId;

  @Prop({ required: true, type: String })
  url: string;

  @Prop({ required: false, default: '', type: String })
  description: string;

  @Prop({ required: true, type: String })
  image: string;

  @Prop({ required: false, type: String, default: 'default' })
  title: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
