import { Response } from 'express';
import { DashboardImagesService } from './images.service';
export declare class DashboardImagesController {
    private readonly service;
    constructor(service: DashboardImagesService);
    uploadImage(body: any, slug: string, files: Express.Multer.File[]): Promise<any[]>;
    getImage(res: Response, name: string): Promise<void>;
}
