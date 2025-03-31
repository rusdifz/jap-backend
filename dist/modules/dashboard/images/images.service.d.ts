import { DashboardImageRepository } from './images.repository';
export declare class DashboardImagesService {
    private readonly repository;
    constructor(repository: DashboardImageRepository);
    uploadImage(files: Express.Multer.File[], property_id: number): Promise<any[]>;
    getImage(image_name: string): Promise<string>;
}
