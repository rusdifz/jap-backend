import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { uploadImageInterceptor } from 'src/middlewares/upload-file';
import { ResponseSuccessInterceptor } from 'src/middlewares';

import { DashboardImagesService } from './images.service';
import { ReqUploadImages } from './dto/request.dto';
import { MediaReferenceType } from 'src/common';

@Controller('media')
export class DashboardImagesController {
  constructor(private readonly service: DashboardImagesService) {}

  @Post('/upload_image/:reference_type/:slug')
  @UseInterceptors(
    FilesInterceptor('media_image', 5, uploadImageInterceptor),
    ResponseSuccessInterceptor,
  )
  async uploadImages(
    // @Body() body: ReqUploadImages,
    @Body() body: any,
    @Param('reference_type') referenceType: MediaReferenceType,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log('Received files:', files.length);

    return await this.service.uploadImages(
      files,
      body.reference_id,
      referenceType,
    );
  }

  // @Post('/upload_image/:reference_type/:slug')
  // @UseInterceptors(
  //   FilesInterceptor('single_image', 1, uploadImageInterceptor),
  //   ResponseSuccessInterceptor,
  // )
  // async uploadSingleImage(
  //   @Body() body: any,
  //   @Param('folder_name') slug: string,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return await this.service.uploaSingleImage(file, body.property_id);
  // }

  @Get('/image/:name')
  async getImage(@Res() res: Response, @Param('name') name: string) {
    const path = await this.service.getImage(name);
    res.sendFile(path);
  }
}
