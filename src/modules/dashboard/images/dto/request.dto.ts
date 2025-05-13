import { IsNotEmpty, IsOptional } from 'class-validator';
import { MediaReferenceType } from 'src/common';

export class ReqUploadImages {
  @IsNotEmpty()
  reference_id: number;

  @IsNotEmpty()
  reference_type: MediaReferenceType;

  @IsNotEmpty()
  folder_name: string;

  @IsOptional()
  files?: Express.Multer.File[];
}

// export class ReqUploadImage {
//   reference_id: number;
//   reference_type: MediaReferenceType;
//   file?: Express.Multer.File;
// }
