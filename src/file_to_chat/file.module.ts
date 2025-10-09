import { forwardRef, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './Schema/file.entity';
import { DBName } from '@/utils/connectDB';
import { CloudinaryModule } from '@/cloudinary/cloudinary.module';
import { GroupChatModule } from '@/group_chat/group_chat.module';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: File.getName(),
          schema: FileSchema,
        },
      ],
      DBName.CHAT_BOX_DB,
    ),
    forwardRef(() => CloudinaryModule),
    forwardRef(() => GroupChatModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
