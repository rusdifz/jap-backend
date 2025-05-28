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
exports.ArticleDB = void 0;
const enums_1 = require("../enums");
const typeorm_1 = require("typeorm");
let ArticleDB = class ArticleDB {
};
exports.ArticleDB = ArticleDB;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], ArticleDB.prototype, "article_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250 }),
    __metadata("design:type", String)
], ArticleDB.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250 }),
    __metadata("design:type", String)
], ArticleDB.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ArticleDB.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250, nullable: true }),
    __metadata("design:type", String)
], ArticleDB.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250, nullable: true }),
    __metadata("design:type", String)
], ArticleDB.prototype, "url_youtube", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250, nullable: true }),
    __metadata("design:type", String)
], ArticleDB.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.StatusPublishEnum,
        default: enums_1.StatusPublishEnum.DRAFT,
    }),
    __metadata("design:type", String)
], ArticleDB.prototype, "status_publish", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ArticleDB.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ArticleDB.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ArticleDB.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250 }),
    __metadata("design:type", String)
], ArticleDB.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250, nullable: true }),
    __metadata("design:type", String)
], ArticleDB.prototype, "updated_by", void 0);
exports.ArticleDB = ArticleDB = __decorate([
    (0, typeorm_1.Entity)({ name: 'article' })
], ArticleDB);
//# sourceMappingURL=article.entity.js.map