import { HttpException, HttpStatus } from '@nestjs/common';
import * as multer from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { dayjs } from 'src/common';
const path = require('path');

export const filterImage = (req: any, file: any, cb: any) => {
  const whitelist = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/heic',
    'video/mp4',
    'video/mpeg',
    'video/webm',
  ];

  if (!whitelist.includes(file.mimetype)) {
    return cb(
      new HttpException('file is not allowed', HttpStatus.BAD_REQUEST),
      null,
    );
  }

  console.log('after whitelist');

  return cb(null, true);
};

export const storageImage = multer.diskStorage({
  destination: (req: any, file: any, callback: any) => {
    const propertyName = req.params.slug;
    console.log('sini', propertyName);

    const directory = file.mimetype.includes('image')
      ? 'public/images/' + propertyName
      : 'public/videos/' + propertyName;
    console.log('dir', directory);

    console.log('asas', __dirname);

    const dirname = __dirname
      .toString()
      .replace('dist/middlewares/upload-file', directory);

    console.log('driname', dirname);

    if (!existsSync(dirname)) {
      console.log('Directory Image Not Exist.');
      mkdirSync(dirname);
      callback(null, dirname);
    }

    console.log('Directory Image Exists.');

    callback(null, dirname);
  },
  filename: (req: any, file: any, callback: any) => {
    const timestamp = dayjs().format('YYMMDDHHmmss');
    const shortUuid = uuidv4().replace(/-/g, '').slice(0, 6);
    const ext = path.extname(file.originalname);
    const filename = `${timestamp}-${shortUuid}-${ext}`;

    callback(null, filename);
  },
});

export const uploadImageInterceptor = {
  storage: storageImage,
  fileFilter: filterImage,
  limits: { fileSize: 50 * 1024 * 1024 }, //max 50 mb
};
