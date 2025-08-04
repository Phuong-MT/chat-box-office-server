// connectDB.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MyLogger } from './logger';
import { Connection } from 'mongoose';
import { log } from 'console';

const logger = new MyLogger();

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_PATH_USER'),
        onConnectionCreate: (connection: Connection) => {
          if (connection) {
            logger.log('user database connected successfully');
          } else {
            logger.log('user database connect failed');
          }
        },
      }),
      connectionName: 'user_db',
    }),
  ],
})
export class ConnectDBModule {}
