import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MyLogger } from './utils/logger';
import { ConfigModule } from '@nestjs/config';
import { ConnectDBModule } from './utils/connectDB';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConnectDBModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [MyLogger, Logger],
})
export class AppModule {}
