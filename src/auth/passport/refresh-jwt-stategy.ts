import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Contacts } from '@/chat-box-shared/contact';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(protected configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req && req.cookies) {
            return req.cookies[Contacts.jwt.REFRESH_TOKEN];
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_REFRESH_SECRET') || 'secretKey',
    });
  }

  async validate(payload: any) {
    return {
      _id: payload._id,
      email: payload.email,
      password: payload.password,
      role: payload.role,
      jit: payload.jit,
    };
  }
}
