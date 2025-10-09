import { Injectable, Inject } from '@nestjs/common';
import { rejects } from 'assert';
import { v2 as Cloudinary, UploadApiResponse } from 'cloudinary';
import { error } from 'console';
import { resolve } from 'path';

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY') private cloudinary: typeof Cloudinary) {}
  async uploadImage(
    file: Express.Multer.File,
    path: string = 'avatar',
    user_id: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader
        .upload_stream(
          { folder: `image/${path}/${user_id}` },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as UploadApiResponse);
          },
        )
        .end(file.buffer);
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    path: string = 'file',
    user_id: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader
        .upload_stream(
          { folder: `file/${path}/${user_id}` },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as UploadApiResponse);
          },
        )
        .end(file.buffer);
    });
  }
}
