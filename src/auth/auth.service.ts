import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, comparePassword, generateUUID } from '@/utils/helper';
import { CreateUserDto } from './dto/create-auth.dto';
import { HttpStatusError } from '@/utils/http-error/http-error-mess';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    //find email
    const user = await this.usersService.findOne('email', email);
    if (!user) {
      return null;
    }

    const camparePassword = await comparePassword(password, user.password);
    if (!camparePassword) {
      return null;
    }
    return user;
  }

  //login
  async login(user: any) {
    const { password, ...safeUser } = user;
    const token = await this.registerToken({ email: user.email, password });
    return {
      _id: user._id,
      userInfo: {
        email: user.email,
        username: user.username,
        role: user.role,
        supper_key_group_chat: user.supper_key_group_chat,
        social_info: user.social_info,
      },
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };
  }

  // register
  async register({ email, password, user_name }: CreateUserDto) {
    const IsEmailNotExit = await this.usersService.findOne('email', email);
    if (IsEmailNotExit) {
      throw new HttpStatusError('Email not exit', 403);
    }
    const hassPassword = await hashPassword(password);
    const user = await this.usersService.create({
      user_name,
      password: hassPassword,
      email,
    });
    if (!user) {
      console.log('create user error');
      throw new HttpStatusError('Server Error', 500);
    }
    const safeUser = {
      email: user.email,
      username: user.username,
      role: user.role,
      supper_key_group_chat: user.supper_key_group_chat,
      social_info: user.social_info,
    };

    const token = await this.registerToken({ email, password });
    return {
      _id: user._id,
      user_info: safeUser,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };
  }

  async registerToken({ email, password }: { email: any; password: any }) {
    const jit = generateUUID();
    const access_token = await this.jwtService.signAsync({
      email,
      password,
      jit,
    });
    const refresh_token = await this.jwtService.signAsync(
      { email, password, jit },
      {
        secret: process.env.JWT_REFRESH_SECRET || 'secretKey',
        expiresIn: process.env.LONG_LIVE || '356d',
      },
    );
    return {
      access_token,
      refresh_token,
    };
  }
}
