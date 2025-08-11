import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpStatusError extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(
      {
        statusCode: status,
        message,
      },
      status,
    );
  }
}
