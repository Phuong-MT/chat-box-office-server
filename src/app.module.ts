import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MyLogger } from './utils/logger';
import { ConfigModule } from '@nestjs/config';
import { ConnectDBModule } from './utils/connectDB';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FollowerModule } from './follower/follower.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConnectDBModule,
    UserModule,
    AuthModule,
    FollowerModule,
  ],
  controllers: [AppController],
  providers: [MyLogger, Logger],
})
export class AppModule {}
