import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  // Thêm sau nếu cần
}
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop()
  username: string;

  @Prop({ default: RoleEnum.USER })
  role: RoleEnum;

  @Prop()
  supper_key_group_chat: string[];

  @Prop({ default: [] })
  social_info: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
