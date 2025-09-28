import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  // Thêm sau nếu cần
}
export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  private static readonly modelName = 'user';

  static getName() {
    return this.modelName;
  }
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  username: string;

  @Prop({ default: RoleEnum.USER })
  role: RoleEnum;

  @Prop()
  super_key_group_chat: string[];

  @Prop({ default: [] })
  social_info: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
