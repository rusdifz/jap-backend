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

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import {
  uploadImageInterceptor,
  validateImageInterceptor,
} from 'src/middlewares/upload-file';
import { ResponseSuccessInterceptor } from 'src/middlewares';

import { DashboardImagesService } from './images.service';
import { ReqUploadImages } from './dto/request.dto';
import { MediaReferenceType } from 'src/common';

@Controller('media')
export class DashboardImagesController {
  constructor(private readonly service: DashboardImagesService) {}

  @Post('/upload_image')
  @UseInterceptors(
    FilesInterceptor('media_image', 5, validateImageInterceptor),
    ResponseSuccessInterceptor,
  )
  async uploadImages(
    @Body() body: ReqUploadImages,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    body.files = files;
    return await this.service.uploadImages(body);
  }

  @Get('/delete/image/:public_id')
  async deleteImage(@Param('public_id') param: string) {
    return await this.service.deleteData(param);
  }

  // @Get('/image/:name')
  // async getImage(@Res() res: Response, @Param('name') name: string) {
  //   const path = await this.service.getImage(name);
  //   res.sendFile(path);
  // }
}
