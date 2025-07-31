import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}
  async validateUser(email: string, password: string) {
    //
    return {
      _id: '1',
      role: 'admin',
      email: 'abc@gmail.con',
    };
  }

  async login(user: any) {
    return {
      _id: '1',
    };
  }
}
