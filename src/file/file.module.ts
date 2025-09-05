import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './Schema/file.entity';
import { DBName } from '@/utils/connectDB';

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
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
