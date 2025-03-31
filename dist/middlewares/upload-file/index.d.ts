import * as multer from 'multer';
export declare const filterImage: (req: any, file: any, cb: any) => any;
export declare const storageImage: multer.StorageEngine;
export declare const uploadImageInterceptor: {
    storage: multer.StorageEngine;
    fileFilter: (req: any, file: any, cb: any) => any;
    limits: {
        fileSize: number;
    };
};
