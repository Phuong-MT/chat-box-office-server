import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schema/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('user', 'user_db') private userModel: Model<UserDocument>,
  ) {}
  async create(): Promise<UserDocument> {
    const createUser = new this.userModel({
      email: 'a@gmail.com',
      username: 'phuong',
    });
    return createUser.save();
  }
}
