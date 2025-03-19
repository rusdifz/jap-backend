import {
  FileTypeValidator,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import * as multer from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const filterImage = (req: any, file: any, cb: any) => {
  const whitelist = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic'];
  console.log('whitelist before');

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
    const dirname = __dirname
      .toString()
      .replace('libs/common/helpers/file-upload', 'images-upload');

    if (!existsSync(dirname)) {
      console.log('Directory Image Not Exist.');
      mkdirSync(dirname);
      callback(null, dirname);
    }

    console.log('Directory Image Exists.');

    callback(null, dirname);
  },
  filename: (req: any, file: any, callback: any) => {
    const extension = file.mimetype.replace('image/', '.');
    const filename = createFilename(extension, req.headers['user'].user_id);

    callback(null, filename);
  },
});

function createFilename(extension: string, userid: string) {
  const uniqcode = uuidv4();
  const filename = 'imgfdn-' + uniqcode + '-TempPhoto' + extension;
  console.log('filename', filename);

  const dirname =
    __dirname.toString().replace('libs/common/helpers/file-upload', 'image') +
    '/' +
    filename;

  if (existsSync(dirname)) {
    console.log('file exist', dirname);
    return createFilename(extension, userid);
  } else {
    console.log('file not exist', dirname);
    return filename;
  }
}

export function uploadedFileParam(maxSize: number, fileType: string | RegExp) {
  return new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize }),
      new FileTypeValidator({ fileType }),
    ],
  });
}
