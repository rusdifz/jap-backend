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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardImagesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const upload_file_1 = require("../../../middlewares/upload-file");
const middlewares_1 = require("../../../middlewares");
const images_service_1 = require("./images.service");
const request_dto_1 = require("./dto/request.dto");
let DashboardImagesController = class DashboardImagesController {
    constructor(service) {
        this.service = service;
    }
    async uploadImages(body, files) {
        body.files = files;
        return await this.service.uploadImages(body);
    }
    async deleteImage(param) {
        return await this.service.deleteData(param);
    }
};
exports.DashboardImagesController = DashboardImagesController;
__decorate([
    (0, common_1.Post)('/upload_image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('media_image', 5, upload_file_1.validateImageInterceptor), middlewares_1.ResponseSuccessInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.ReqUploadImages, Array]),
    __metadata("design:returntype", Promise)
], DashboardImagesController.prototype, "uploadImages", null);
__decorate([
    (0, common_1.Get)('/delete/image/:public_id'),
    __param(0, (0, common_1.Param)('public_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardImagesController.prototype, "deleteImage", null);
exports.DashboardImagesController = DashboardImagesController = __decorate([
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [images_service_1.DashboardImagesService])
], DashboardImagesController);
//# sourceMappingURL=images.controller.js.map