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
exports.ClientArticleController = void 0;
const common_1 = require("@nestjs/common");
const response_dto_1 = require("./dto/response.dto");
const article_service_1 = require("./article.service");
let ClientArticleController = class ClientArticleController {
    constructor(service) {
        this.service = service;
    }
    async getDetail(id) {
        return await this.service.getDetail(Number(id));
    }
    async getList(query) {
        return await this.service.getList(query);
    }
};
exports.ClientArticleController = ClientArticleController;
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientArticleController.prototype, "getDetail", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [response_dto_1.ArticleListDTO]),
    __metadata("design:returntype", Promise)
], ClientArticleController.prototype, "getList", null);
exports.ClientArticleController = ClientArticleController = __decorate([
    (0, common_1.Controller)('client/article'),
    __metadata("design:paramtypes", [article_service_1.ClientArticleService])
], ClientArticleController);
//# sourceMappingURL=article.controller.js.map