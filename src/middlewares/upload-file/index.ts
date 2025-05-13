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

  console.log('file type', file.mimetype);

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
    const folderName = req.params.reference_type + '/' + req.params.slug;
    const publicFolderImage =
      process.env.NODE_ENV === 'localhost'
        ? 'public/images-local/'
        : 'public/images/';
    const publicFolderVideo =
      process.env.NODE_ENV === 'localhost'
        ? 'public/videos-local/'
        : 'public/videos/';

    const directory = file.mimetype.includes('image')
      ? publicFolderImage + folderName
      : publicFolderVideo + folderName;

    const dirname = __dirname
      .toString()
      .replace('dist/middlewares/upload-file', directory);

    if (!existsSync(dirname)) {
      console.log('Directory Image Not Exist.');
      mkdirSync(dirname, { recursive: true });
      callback(null, dirname);
    } else {
      console.log('Directory Image Exists.');
    }

    callback(null, '');
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

export const validateImageInterceptor = {
  fileFilter: filterImage,
  limits: { fileSize: 50 * 1024 * 1024 }, //max 50 mb
};
