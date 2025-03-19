// import { MediaTypeEnum } from '@libs/common';
// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// // import { readFileSync } from 'fs';

// import { ImagesRepository } from './images.repository';
// import { existsSync } from 'fs';

// @Injectable()
// export class ImagesService {
//   constructor(private readonly repository: ImagesRepository) {}

//   async uploadSingleImage(
//     file: Express.Multer.File,
//     officeId: string,
//     unitId: string,
//   ) {
//     // const imageData = readFileSync(file.path);

//     const mapData = {
//       office_id: officeId,
//       unitId: unitId,
//       type: MediaTypeEnum.IMAGE,
//       url: `${process.env.URL_IMAGE}/media/image/${file.filename}`,
//       created_by: 'admin',
//     };

//     //save data
//     await this.repository.upsert(mapData);

//     return mapData.url;
//   }

//   async getImage(imageName: string) {
//     const whitelist = ['.jpeg', '.jpg', '.png'];

//     if (whitelist.includes(imageName)) {
//       console.log('type wrong');
//       throw new HttpException('wrong file type', HttpStatus.BAD_REQUEST);
//     }

//     const path = __dirname
//       .toString()
//       .replace('apps/dashboard/src/modules/images', 'media/image/' + imageName);

//     if (existsSync(path)) {
//       return path;
//     } else {
//       return path;
//     }

//     // let uniqCode = imageName.replace(/.png|.jpg|.jpeg|.hiec/g, '');

//     // const stream = await this.repoTempImage.findOne({
//     //   where: {
//     //     rvwr_unique_code: Like(`%${uniqCode}%`),
//     //   },
//     // });

//     // if (!stream) {
//     //   throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
//     // }

//     // await writeFileSync(path, stream.img_data);
//   }
// }
