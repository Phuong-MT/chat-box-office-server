import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.entity';
import { CreateUserDto } from '@/auth/dto/create-auth.dto';
import { DBName } from '@/utils/connectDB';
import { UserInfoDto } from './dto/user-infor.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.getName(), DBName.USER_DB)
    private userModel: Model<UserDocument>,
  ) {}

  async create({
    user_name,
    password,
    email,
  }: {
    user_name: string;
    password: any;
    email: string;
  }): Promise<UserDocument> {
    const createUser = new this.userModel({
      email,
      username: user_name,
      password,
    });
    return createUser.save();
  }

  async findOne(key: any, value: any): Promise<UserDocument | null> {
    return this.userModel.findOne({
      [key]: value,
    });
  }

  async getUserInfo(_id: string): Promise<UserInfoDto | null> {
    const user = await this.userModel.findById(_id).lean();

    if (!user) {
      return null;
    }

    return {
      _id: user._id.toString(),
      email: user.email,
      username: user.username,
      role: user.role,
      super_key_group_chat: user.super_key_group_chat,
      social_info: user.social_info,
    };
  }
}
