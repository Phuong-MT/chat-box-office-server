import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Contacts } from '@/chat-box-shared/contact';
import * as cookie from 'cookie';

@Injectable()
export class WsStrategy extends PassportStrategy(Strategy, 'ws-jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (handshake: any) => {
          const headers = handshake?.headers;
          const cookieHeader = headers?.cookie;

          if (!cookieHeader) return null;

          const cookies = cookie.parse(cookieHeader);
          return cookies?.[Contacts.jwt.ACCESS_TOKEN] || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'secretKey',
    });
  }

  async validate(payload: any) {
    // Payload sau khi verify JWT
    return payload;
  }
}
