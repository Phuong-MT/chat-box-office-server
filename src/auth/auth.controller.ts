import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { CreateUserDto } from './dto/create-auth.dto';
import { ApiBody, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { HttpStatusError } from '@/utils/http-error/http-error-mess';
import { JwtRefreshGuard } from './passport/refresh-jwt-auth-guard';
import { Contacts } from '@/chat-box-shared/contact';

@Controller('auth')
// ratelimit request 10/min
@Throttle({ default: { ttl: 60000, limit: 10 } })
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiProperty()
  @ApiBody({
    schema: {
      example: {
        email: 'example@gmail.com',
        password: 'MinhPhuong123@',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Đăng nhập thành công',
    schema: {
      example: {
        _id: '68999588daca8983e00ab5af',
        user_info: {
          email: 'example@gmail.com',
          username: 'MinhPhuong',
          role: 'user',
          supper_key_group_chat: [],
          social_info: [],
        },
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiJNaW5oUGh1b25nMTIzQCIsImppdCI6IjJkNmRhODY0LTM0NzgtNGI4Mi1hYzk4LWY5YjA0MGZhZTg1ZiIsImlhdCI6MTc1NDg5NTc1MiwiZXhwIjoxNzg2NDMxNzUyfQ.UeLIHqhObHuT0ftQs5rTmLIuIVjKJPTFD04q5PxsaCQ',
        refresh_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiJNaW5oUGh1b25nMTIzQCIsImppdCI6IjJkNmRhODY0LTM0NzgtNGI4Mi1hYzk4LWY5YjA0MGZhZTg1ZiIsImlhdCI6MTc1NDg5NTc1MiwiZXhwIjoyMDcwMjU1NzUyfQ.eEE6MoCP3fgxr5RUpNNK1D_s7bOeifzRqk7MzABlCuE',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'unauthorized',
    schema: {
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  async login(
    @Request() req: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userInfor = await this.authService.login(req.user);
    const access_token = userInfor.access_token;
    const refresh_token = userInfor.refresh_token;

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true', // true in prod
      sameSite: 'lax' as const,
      domain: process.env.COOKIE_DOMAIN || undefined,
      path: '/auth',
    };

    response.cookie(Contacts.jwt.ACCESS_TOKEN, access_token, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    response.cookie(Contacts.jwt.REFRESH_TOKEN, refresh_token, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return userInfor.user_info;
  }

  //register
  @Post('register')
  @ApiProperty()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Đăng ký thành công',
    schema: {
      example: {
        _id: '68999588daca8983e00ab5af',
        user_info: {
          email: 'example@gmail.com',
          username: 'MinhPhuong',
          role: 'user',
          supper_key_group_chat: [],
          social_info: [],
        },
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiJNaW5oUGh1b25nMTIzQCIsImppdCI6IjJkNmRhODY0LTM0NzgtNGI4Mi1hYzk4LWY5YjA0MGZhZTg1ZiIsImlhdCI6MTc1NDg5NTc1MiwiZXhwIjoxNzg2NDMxNzUyfQ.UeLIHqhObHuT0ftQs5rTmLIuIVjKJPTFD04q5PxsaCQ',
        refresh_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiJNaW5oUGh1b25nMTIzQCIsImppdCI6IjJkNmRhODY0LTM0NzgtNGI4Mi1hYzk4LWY5YjA0MGZhZTg1ZiIsImlhdCI6MTc1NDg5NTc1MiwiZXhwIjoyMDcwMjU1NzUyfQ.eEE6MoCP3fgxr5RUpNNK1D_s7bOeifzRqk7MzABlCuE',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Email đã tồn tại',
    schema: {
      example: {
        message: 'Email not exit',
        statusCode: 403,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Lỗi server',
    schema: {
      example: {
        message: 'Server Error',
        statusCode: 500,
      },
    },
  })
  async register(
    @Body() createDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user_name, email, password } = createDto;

    const userInfo = await this.authService.register({
      user_name,
      email,
      password,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true', // true in prod
      sameSite: 'lax' as const,
      domain: process.env.COOKIE_DOMAIN || undefined,
      path: '/auth',
    };

    response.cookie(Contacts.jwt.ACCESS_TOKEN, userInfo.access_token, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    response.cookie(Contacts.jwt.REFRESH_TOKEN, userInfo.refresh_token, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return userInfo.user_info;
  }
  //refresh token
  @UseGuards(JwtRefreshGuard)
  @Post('/refresh-token')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'refresh token',
    schema: {
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6MSwicGFzc3dvcmQiOjEsImppdCI6IjZmNzNkZGRlLWIxNzMtNDc1Mi05NjIyLWU0OTEzZmRjMjY0ZSIsImlhdCI6MTc1NzM4MzE2MiwiZXhwIjoxNzg4OTE5MTYyfQ.NXeJ8FyPb9CUxqAWlXxQkJXAnvyieghx6KFiE-VLRjE',
        refresh_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6MSwicGFzc3dvcmQiOjEsImppdCI6IjZmNzNkZGRlLWIxNzMtNDc1Mi05NjIyLWU0OTEzZmRjMjY0ZSIsImlhdCI6MTc1NzM4MzE2MiwiZXhwIjoyMDcyNzQzMTYyfQ.5Ea_mndWFSDUuYrU4jZfeVijLnT7O-4o2z5zKRQaHtY',
      },
    },
  })
  async refreshToken(
    @Request() req: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = req.user;
    if (!user) {
      throw new HttpStatusError('Không tìm thấy User', 404);
    }
    const { _id, email, password, role } = req.user;
    const token = await this.authService.registerToken({
      userID: _id,
      email,
      password,
      role,
    });
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true', // true in prod
      sameSite: 'lax' as const,
      domain: process.env.COOKIE_DOMAIN || undefined,
      path: '/auth',
    };

    response.cookie(Contacts.jwt.ACCESS_TOKEN, token.access_token, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    response.cookie(Contacts.jwt.REFRESH_TOKEN, token.refresh_token, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return 'Refresh token successfully';
  }

  //logout
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true', // true in prod
      sameSite: 'lax' as const,
      domain: process.env.COOKIE_DOMAIN || undefined,
      path: '/auth',
      expires: new Date(0),
    };
    res.cookie(Contacts.jwt.ACCESS_TOKEN, '', { ...cookieOptions });
    res.cookie(Contacts.jwt.REFRESH_TOKEN, '', { ...cookieOptions });
    return 'Logged out successfully';
  }
}
