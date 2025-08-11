// connectDB.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MyLogger } from './logger';
import { Connection } from 'mongoose';

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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_PATH_CHAT_MESS'),
        onConnectionCreate: (connection: Connection) => {
          if (connection) {
            logger.log('chat_mess database connected successfully');
          } else {
            logger.log('chat_mess database connect failed');
          }
        },
      }),
      connectionName: 'user_db',
    }),
  ],
})
export class ConnectDBModule {}
