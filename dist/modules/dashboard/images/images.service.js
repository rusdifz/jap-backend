"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardImagesService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const cloudinary_file_service_1 = require("../../../libs/cloudinary-file/cloudinary-file.service");
const article_service_1 = require("../article/article.service");
const admin_service_1 = require("../admin/admin.service");
const feedback_service_1 = require("../feedback/feedback.service");
const master_location_service_1 = require("../master-location/master-location.service");
const images_repository_1 = require("./images.repository");
const upsert_mapping_1 = require("./mappings/upsert.mapping");
const common_2 = require("../../../common");
let DashboardImagesService = class DashboardImagesService {
    constructor(repository, articleService, adminService, feedbackService, masterLocationService, cdnService) {
        this.repository = repository;
        this.articleService = articleService;
        this.adminService = adminService;
        this.feedbackService = feedbackService;
        this.masterLocationService = masterLocationService;
        this.cdnService = cdnService;
    }
    async uploadImages(body) {
        console.log('before check', body);
        const checkDataExist = await this.repository.find({
            where: {
                reference_id: body.reference_id,
                reference_type: body.reference_type,
            },
        });
        console.log('after check');
        if (checkDataExist.length > 0) {
            for (const exist of checkDataExist) {
                await Promise.all([
                    this.repository.delete({ media_id: exist.media_id }),
                    this.cdnService.deleteFiled(exist.public_id),
                ]);
            }
        }
        console.log('check exist', checkDataExist);
        if (body.files.length > 0) {
            console.log('yes');
            const resp = [];
            for (const file of body.files) {
                const folderName = `${body.reference_type}/${body.folder_name}`;
                const uploadFile = await this.cdnService.FileUpload(file, folderName);
                console.log('upload file', uploadFile);
                const mapData = await (0, upsert_mapping_1.mapInsertDB)(file, body.reference_id, body.reference_type, uploadFile);
                const saveData = await this.repository.save(mapData);
                if (body.reference_type === common_2.MediaReferenceType.ARTICLE) {
                    await this.articleService.updateImage(body.reference_id, mapData.full_url);
                }
                else if (body.reference_type === common_2.MediaReferenceType.FEEDBACK) {
                    await this.feedbackService.updateImage(body.reference_id, mapData.full_url);
                }
                else if (body.reference_type === common_2.MediaReferenceType.MASTER_LOCATION) {
                    await this.masterLocationService.updateImage(body.reference_id, mapData.full_url);
                }
                else if (body.reference_type === common_2.MediaReferenceType.USER) {
                    await this.adminService.updateImage(body.reference_id, mapData.full_url);
                }
                resp.push(saveData);
            }
            return resp;
        }
        return null;
    }
    async deleteData(param) {
        return await this.cdnService.deleteFiled(param);
    }
    async getImage(image_name) {
        const whitelist = ['.jpeg', '.jpg', '.png'];
        if (whitelist.includes(image_name)) {
            throw new common_1.HttpException('wrong file type', common_1.HttpStatus.BAD_REQUEST);
        }
        const getData = await this.repository.findOneBy({ public_id: image_name });
        if (getData) {
            const path = getData.path + '/' + image_name;
            if ((0, fs_1.existsSync)(path)) {
                return path;
            }
        }
        throw new common_1.HttpException('Data Not Found', common_1.HttpStatus.NOT_FOUND);
    }
    async findImageJoin(reference_id, reference_type) {
        return await this.repository.find({
            where: { reference_id, reference_type },
        });
    }
};
exports.DashboardImagesService = DashboardImagesService;
exports.DashboardImagesService = DashboardImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [images_repository_1.DashboardImageRepository,
        article_service_1.DashboardArticleService,
        admin_service_1.AdminService,
        feedback_service_1.DashboardFeedbackService,
        master_location_service_1.DashboardMasterLocationService,
        cloudinary_file_service_1.CloudinaryFileService])
], DashboardImagesService);
//# sourceMappingURL=images.service.js.map