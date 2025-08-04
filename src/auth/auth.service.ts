import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, comparePassword } from '@/utils/helper';
import { CreateAuthDto } from './dto/create-auth.dto';
@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}
  async validateUser(email: string, password: string) {
    //find email
    const user = 1; // const user = this.userService.findEmail(email)

    if (!user) {
      return null;
    }

    // comparePassword
    const isPasswordMatch = await comparePassword(password, '1');
    if (!isPasswordMatch) {
      return null;
    }
    return user;
  }

  //login
  async login(user: any) {
    const { password, ...safeUser } = user;
    return {
      _id: user._id,
      userInfo: safeUser,
    };
  }

  // register
  // async register({ email, password, user_name }: CreateAuthDto) {
  //   const IsEmailNotExit = this.usersService.findOne();
  // }
}
