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
exports.ReqUpdateArticleDTO = exports.ReqCreateArticleDTO = exports.ArticleListDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const common_1 = require("../../../../common");
class ArticleListDTO extends common_1.PaginationDTO {
}
exports.ArticleListDTO = ArticleListDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase()),
    __metadata("design:type", String)
], ArticleListDTO.prototype, "search_keyword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: common_1.StatusPublishEnum.DRAFT }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(common_1.StatusPublishEnum, {
        message: 'Value status must be list in enum',
    }),
    __metadata("design:type", String)
], ArticleListDTO.prototype, "status_publish", void 0);
class ReqCreateArticleDTO {
}
exports.ReqCreateArticleDTO = ReqCreateArticleDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, common_1.IsUnique)(common_1.ArticleDB, 'title', {
        message: 'The title already exists ',
    }),
    __metadata("design:type", String)
], ReqCreateArticleDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCreateArticleDTO.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], ReqCreateArticleDTO.prototype, "thumbnail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], ReqCreateArticleDTO.prototype, "url_youtube", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: common_1.StatusPublishEnum.DRAFT }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(common_1.StatusPublishEnum, {
        message: 'Value status must be list in enum',
    }),
    __metadata("design:type", String)
], ReqCreateArticleDTO.prototype, "status_publish", void 0);
class ReqUpdateArticleDTO extends ReqCreateArticleDTO {
}
exports.ReqUpdateArticleDTO = ReqUpdateArticleDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ReqUpdateArticleDTO.prototype, "article_id", void 0);
//# sourceMappingURL=request.dto.js.map