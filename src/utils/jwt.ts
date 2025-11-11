import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
class ServiceJWT {
  private readonly jwtService: JwtService;
  private configService: ConfigService;
  constructor() {}

  async decodeToken(token: string) {
    try {
      const secret =
        this.configService.get<string>('JWT_SECRET') ?? 'secretKey';
      return await this.jwtService.verifyAsync(token, { secret });
    } catch (err) {
      // return null on invalid/expired token (adjust behavior as needed)
      return null;
    }
  }
}

// factory function to create ServiceJWT with required dependencies
export const serviceJWT = new JwtService();
