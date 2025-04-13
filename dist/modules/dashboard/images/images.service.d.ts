import { DashboardArticleService } from '../article/article.service';
import { AdminService } from '../admin/admin.service';
import { DashboardFeedbackService } from '../feedback/feedback.service';
import { DashboardImageRepository } from './images.repository';
import { IMedia, MediaReferenceType } from 'src/common';
export declare class DashboardImagesService {
    private readonly repository;
    private readonly articleService;
    private readonly adminService;
    private readonly feedbackService;
    constructor(repository: DashboardImageRepository, articleService: DashboardArticleService, adminService: AdminService, feedbackService: DashboardFeedbackService);
    uploadImages(files: Express.Multer.File[], reference_id: number, reference_type: MediaReferenceType): Promise<IMedia[]>;
    uploaSingleImage(files: Express.Multer.File, property_id: number): Promise<void>;
    getImage(image_name: string): Promise<string>;
    findImageJoin(reference_id: number, reference_type: MediaReferenceType): Promise<import("src/common").MediaDB[]>;
}
