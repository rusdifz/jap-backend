import { CloudinaryFileService } from 'src/libs/cloudinary-file/cloudinary-file.service';
import { DashboardArticleService } from '../article/article.service';
import { AdminService } from '../admin/admin.service';
import { DashboardFeedbackService } from '../feedback/feedback.service';
import { DashboardMasterLocationService } from '../master-location/master-location.service';
import { DashboardImageRepository } from './images.repository';
import { IMedia, MediaReferenceType, PropertiesDB } from 'src/common';
import { ReqUploadImages } from './dto/request.dto';
export declare class DashboardImagesService {
    private readonly repository;
    private readonly articleService;
    private readonly adminService;
    private readonly feedbackService;
    private readonly masterLocationService;
    private readonly cdnService;
    constructor(repository: DashboardImageRepository, articleService: DashboardArticleService, adminService: AdminService, feedbackService: DashboardFeedbackService, masterLocationService: DashboardMasterLocationService, cdnService: CloudinaryFileService);
    uploadImages(body: ReqUploadImages): Promise<IMedia[]>;
    deleteData(param: string): Promise<any>;
    getImage(image_name: string): Promise<string>;
    findImageJoin(reference_id: number, reference_type: MediaReferenceType): Promise<import("src/common").MediaDB[]>;
    uploadImageBulk(properties: PropertiesDB[], type: MediaReferenceType): Promise<any[]>;
    uploadImageThumbnailBulk(properties: PropertiesDB[]): Promise<any[]>;
}
