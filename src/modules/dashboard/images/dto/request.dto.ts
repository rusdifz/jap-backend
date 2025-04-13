import { MediaReferenceType } from 'src/common';

export class ReqUploadImages {
  reference_id: number;
  reference_type: MediaReferenceType;
  files?: Express.Multer.File[];
}

export class ReqUploadImage {
  reference_id: number;
  reference_type: MediaReferenceType;
  file?: Express.Multer.File;
}
