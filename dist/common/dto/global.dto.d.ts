declare enum uploadType {
    IMAGE = "image"
}
export declare class UploadSingleDTO {
    key: uploadType;
    file: Express.Multer.File;
}
export {};
