import { MediaReferenceType } from 'src/common';
export declare class ReqUploadImages {
    reference_id: number;
    reference_type: MediaReferenceType;
    folder_name: string;
    files?: Express.Multer.File[];
}
