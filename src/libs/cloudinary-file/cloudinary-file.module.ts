import { Module } from '@nestjs/common';
import { CloudinaryProvider } from 'src/config/cloudinary/cloudinary.config';

import { CloudinaryFileService } from './cloudinary-file.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryFileService],
  exports: [CloudinaryFileService],
})
export class CloudinaryFileModule {}
