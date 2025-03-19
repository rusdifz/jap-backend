import { IsEmpty, IsOptional } from 'class-validator';

enum uploadType {
  IMAGE = 'image',
}
export class UploadSingleDTO {
  @IsOptional()
  key: uploadType;

  @IsEmpty() // get via form data, not allowed on body
  file: Express.Multer.File;
}
