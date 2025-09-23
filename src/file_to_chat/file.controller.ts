import {
  Body,
  Controller,
  Post,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '@/auth/passport/file-validation';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth-guard';
import { Contacts } from '@/chat-box-shared/contact';
import { HttpStatusError } from '@/utils/http-error/http-error-mess';

const MimeTypes = Contacts.MimeTypeFile;
@Controller('file')
@UseGuards(JwtAuthGuard)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/group-avatar')
  @UseInterceptors(FileInterceptor('group-avatar'))
  async uploadAvatar(
    @UploadedFile(
      new FileValidationPipe(5.5 * 1025 * 1024, [
        MimeTypes.IMAGE_JPEG,
        MimeTypes.IMAGE_PNG,
      ]),
    )
    avatar: Express.Multer.File,
    @Body() payload: { groupId: string },
    @Request() req: any,
  ) {
    //check user_last_update
    const groupId = payload?.groupId;
    const user_id = req.user?._id;
    if (!user_id) {
      throw new HttpStatusError('user not found', 400);
    }
    // check groupId
    if (!groupId) {
      throw new HttpStatusError('Group chat not found', 400);
    }
    return await this.fileService.uploadAvatar(avatar, user_id, groupId);
  }
}
