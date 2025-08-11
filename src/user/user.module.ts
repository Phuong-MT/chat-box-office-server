import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schema/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.getName(), schema: UserSchema }],
      'user_db',
    ),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
