import { UploadApiResponse } from 'cloudinary';
import { MediaDB, MediaReferenceType } from 'src/common';
export declare function mapInsertDB(file: Express.Multer.File, reference_id: number, reference_type: MediaReferenceType, resp_cloudinary: UploadApiResponse | any): Promise<Partial<MediaDB>>;
