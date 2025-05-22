import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryFileService {
    FileUpload(file: Express.Multer.File, folder_name: string): Promise<UploadApiResponse | UploadApiErrorResponse>;
    deleteFiled(public_id: string): Promise<any>;
}
