import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(protected configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_REFRESH_SECRET') || 'secretKey',
    });
  }

  async validate(payload: any) {
    if (payload) {
      throw new HttpException('Token has been revoked', 419);
    }
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      jit: payload.jit,
    };
  }
}
