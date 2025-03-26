import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { uploadImageInterceptor } from 'src/middlewares/upload-file';
import { ResponseSuccessInterceptor } from 'src/middlewares';

import { DashboardImagesService } from './images.service';

@Controller('media')
export class DashboardImagesController {
  constructor(private readonly service: DashboardImagesService) {}

  @Post('/upload_image/:slug')
  @UseInterceptors(
    FilesInterceptor('property_image', 5, uploadImageInterceptor),
    ResponseSuccessInterceptor,
  )
  async uploadImage(
    @Body() body: any,
    @Param('slug') slug: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return await this.service.uploadImage(files, body.property_id);
  }

  @Get('/image/:name')
  async getImage(@Res() res: Response, @Param('name') name: string) {
    const path = await this.service.getImage(name);
    res.sendFile(path);
  }
}
