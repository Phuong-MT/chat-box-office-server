import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class Messages {
  private static readonly modelName = 'messages';

  static getName() {
    return this.modelName;
  }
}
