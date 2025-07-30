import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyLogger } from './utils/logger';
import { ConfigModule } from '@nestjs/config';
import { ConnectDBModule } from './utils/connectDB';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConnectDBModule,
  ],
  controllers: [AppController],
  providers: [AppService, MyLogger, Logger],
})
export class AppModule {}
