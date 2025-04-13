"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardImagesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_2 = require("../../../common");
const images_repository_1 = require("./images.repository");
const images_service_1 = require("./images.service");
const images_controller_1 = require("./images.controller");
const feedback_module_1 = require("../feedback/feedback.module");
const article_module_1 = require("../article/article.module");
const admin_module_1 = require("../admin/admin.module");
let DashboardImagesModule = class DashboardImagesModule {
};
exports.DashboardImagesModule = DashboardImagesModule;
exports.DashboardImagesModule = DashboardImagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([common_2.MediaDB]),
            feedback_module_1.DashboardFeedbackModule,
            article_module_1.DashboardArticleModule,
            admin_module_1.AdminModule,
        ],
        providers: [images_repository_1.DashboardImageRepository, images_service_1.DashboardImagesService],
        controllers: [images_controller_1.DashboardImagesController],
        exports: [images_service_1.DashboardImagesService],
    })
], DashboardImagesModule);
//# sourceMappingURL=images.module.js.map