// connectDB.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MyLogger } from './logger';
import { Connection } from 'mongoose';

const logger = new MyLogger();
export enum DBName {
  USER_DB = 'USER_DB',
  CHAT_BOX_DB = 'CHAT_BOX_DB',
}
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
      connectionName: DBName.USER_DB,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_PATH_CHAT_MESS'),
        onConnectionCreate: (connection: Connection) => {
          if (connection) {
            logger.log('chat-box database connected successfully');
          } else {
            logger.log('chat-box database connect failed');
          }
        },
      }),
      connectionName: DBName.CHAT_BOX_DB,
    }),
  ],
})
export class ConnectDBModule {}
