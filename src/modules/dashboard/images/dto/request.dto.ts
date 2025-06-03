import { IsNotEmpty, IsOptional } from 'class-validator';
import { IMedia, MediaReferenceType } from 'src/common';

export class ReqUploadImages {
  @IsNotEmpty()
  reference_id: number;

  @IsNotEmpty()
  reference_type: MediaReferenceType;

  @IsNotEmpty()
  folder_name: string;

  @IsOptional()
  files?: Express.Multer.File[];

  @IsOptional()
  files_old?: string; // for data image yang sudah di upload
}

// export class ReqUploadImage {
//   reference_id: number;
//   reference_type: MediaReferenceType;
//   file?: Express.Multer.File;
// }
