import { DashboardImagesService } from './images.service';
import { ReqUploadImages } from './dto/request.dto';
export declare class DashboardImagesController {
    private readonly service;
    constructor(service: DashboardImagesService);
    uploadImages(body: ReqUploadImages, files: Express.Multer.File[]): Promise<import("src/common").IMedia[]>;
    deleteImage(param: string): Promise<any>;
}
