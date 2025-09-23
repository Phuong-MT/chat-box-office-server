import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkSchema, Link } from './Schema/link.entity';
import { DBName } from '@/utils/connectDB';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Link.getName(), schema: LinkSchema }],
      DBName.CHAT_BOX_DB,
    ),
  ],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
