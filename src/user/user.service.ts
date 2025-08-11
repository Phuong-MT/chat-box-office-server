import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.entity';
import { CreateUserDto } from '@/auth/dto/create-auth.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.getName(), 'user_db')
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
}
