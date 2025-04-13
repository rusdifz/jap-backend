import { Response } from 'express';
import { DashboardImagesService } from './images.service';
import { MediaReferenceType } from 'src/common';
export declare class DashboardImagesController {
    private readonly service;
    constructor(service: DashboardImagesService);
    uploadImages(body: any, referenceType: MediaReferenceType, files: Express.Multer.File[]): Promise<import("src/common").IMedia[]>;
    getImage(res: Response, name: string): Promise<void>;
}
