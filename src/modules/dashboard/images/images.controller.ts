// import { ResponseSuccessInterceptor } from '@libs/middlewares';
// import {
//   Body,
//   Controller,
//   Get,
//   Headers,
//   Param,
//   Post,
//   Res,
//   UploadedFile,
//   UseInterceptors,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import type { Response } from 'express';

// import { filterImage, storageImage } from 'libs/common/helpers/file-upload';

// import { ImagesService } from './images.service';

// @Controller('media')
// export class ImagesController {
//   constructor(private readonly service: ImagesService) {}

//   @Post('/upload_image/:office_id/:unit_id')
//   @UseInterceptors(
//     FileInterceptor('thumbnail', {
//       storage: storageImage,
//       fileFilter: filterImage,
//       limits: { fileSize: 1024 * 1024 },
//     }),
//     ResponseSuccessInterceptor,
//   )
//   async UploadPhotoTemp(
//     @Body() body: any,
//     @Param('image_id') officeId: string,
//     @Param('unit_id') unitId: string,
//     @UploadedFile() picture: Express.Multer.File,
//   ) {
//     return await this.service.uploadSingleImage(picture, officeId, unitId);
//   }

//   @Get('/image/:name')
//   async GetPhoto(@Res() res: Response, @Param(':name') param: string) {
//     const path = await this.service.getImage(param);
//     res.sendFile(path);
//   }
// }
