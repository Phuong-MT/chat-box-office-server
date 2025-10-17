import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsJwtGuard extends AuthGuard('ws-jwt') {
  getRequest(context: ExecutionContext) {
    // Lấy Socket thay vì HTTP request
    const client = context.switchToWs().getClient();
    return client.handshake;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw new WsException('Unauthorized');
    }
    return user;
  }
}
