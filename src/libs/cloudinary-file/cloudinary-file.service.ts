import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
const streamifier = require('streamifier');
const sharp = require('sharp');

@Injectable()
export class CloudinaryFileService {
  async FileUpload(
    file: Express.Multer.File,
    folder_name: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    // Ubah ukuran gambar di sisi klien
    const resizedBuffer = await sharp(file.buffer)
      .resize({ width: 800, height: 600, fit: 'inside' })
      .toBuffer();

    // Unggah menggunakan stream
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'jardine-asia-pasific/' + folder_name,
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
          eager: [{ width: 1200, quality: 'auto', fetch_format: 'auto' }],
          eager_async: true,
        },
        (error, result) => {
          if (error) {
            console.log('error', error);

            reject(error);
          } else resolve(result);
        },
      );
      stream.end(resizedBuffer);
    });
  }

  async deleteFiled(public_id: string) {
    return await cloudinary.api.delete_resources([public_id], {
      resource_type: 'image',
    });
  }
}
