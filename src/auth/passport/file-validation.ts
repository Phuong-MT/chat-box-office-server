import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Inject,
} from '@nestjs/common';
import { HttpStatusError } from '@/utils/http-error/http-error-mess';

@Injectable()
export class MultiFileValidationPipe implements PipeTransform {
  constructor(
    @Inject('MAX_SIZE_FILE') private readonly maxFileSizeBytes: number,
    @Inject('ALLOWED_MIME_TYPES') private readonly MimeTypes: string[],
  ) {}
  transform(values: Express.Multer.File[], metadata: ArgumentMetadata) {
    if (values.length === 0) {
      throw new HttpStatusError('files is required', 400);
    }
    values.forEach((file) => {
      if (file.size > this.maxFileSizeBytes) {
        throw new HttpStatusError(
          `File ${file.originalname} too large. Max size is 5.5MB`,
          400,
        );
      }
      if (!this.MimeTypes.includes(file.mimetype)) {
        throw new HttpStatusError(
          `Invalid file type. Allowed types: ${this.MimeTypes.join(', ')}`,
          400,
        );
      }
    });

    return values;
  }
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(
    @Inject('MAX_SIZE_FILE') private readonly maxFileSizeBytes: number,
    @Inject('ALLOWED_MIME_TYPES') private readonly MimeTypes: string[],
  ) {}
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    console.log('file: ', value);
    if (!value) {
      throw new HttpStatusError('file is required', 400);
    }
    if (value.size > this.maxFileSizeBytes) {
      throw new HttpStatusError(`File too large. Max size is 5.5MB`, 400);
    }

    if (!this.MimeTypes.includes(value.mimetype)) {
      console.log('mimetype: ', value.mimetype);
      throw new HttpStatusError(
        `Invalid file type. Allowed types: ${this.MimeTypes.join(', ')}`,
        400,
      );
    }

    return value;
  }
}
