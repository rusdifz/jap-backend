"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardArticleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const article_service_1 = require("./article.service");
const article_controller_1 = require("./article.controller");
const common_2 = require("../../../common");
const article_repository_1 = require("./article.repository");
let DashboardArticleModule = class DashboardArticleModule {
};
exports.DashboardArticleModule = DashboardArticleModule;
exports.DashboardArticleModule = DashboardArticleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([common_2.ArticleDB])],
        providers: [article_repository_1.DashboardArticleRepository, article_service_1.DashboardArticleService],
        controllers: [article_controller_1.DashboardArticleController],
        exports: [article_service_1.DashboardArticleService],
    })
], DashboardArticleModule);
//# sourceMappingURL=article.module.js.map