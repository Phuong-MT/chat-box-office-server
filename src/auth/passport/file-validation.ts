import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class MultiFileSizeValidationPipe implements PipeTransform {
  transform(values: Express.Multer.File[], metadata: ArgumentMetadata) {
    const MAX_FILE_SIZE_BYTES = 5.5 * 1024 * 1024;

    values.forEach((file) => {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        throw new BadRequestException(
          `File ${file.originalname} too large. Max size is 5.5MB`,
        );
      }
    });

    return values; // ✅ trả về array files
  }
}

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    const MAX_FILE_SIZE_BYTES = 5.5 * 1024 * 1024; // ~5.5MB

    if (value.size > MAX_FILE_SIZE_BYTES) {
      throw new BadRequestException(`File too large. Max size is 5.5MB`);
    }

    return value; // ✅ trả lại file để controller nhận được
  }
}
