import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth-guard';
import { HttpStatusError } from '@/utils/http-error/http-error-mess';
import { UserInfoDto } from './dto/user-infor.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('user-info')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Req() req: any): Promise<UserInfoDto | null> {
    const userId = req.user?._id;
    if (!userId) {
      throw new HttpStatusError('user not found', 404);
    }
    const userInfo = await this.userService.getUserInfo(userId);

    if (!userInfo) {
      throw new HttpStatusError('user not found', 404);
    }
    return userInfo;
  }
}
