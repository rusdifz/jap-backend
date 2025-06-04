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
exports.FeedbackDB = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
let FeedbackDB = class FeedbackDB {
};
exports.FeedbackDB = FeedbackDB;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], FeedbackDB.prototype, "feedback_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250, nullable: true }),
    __metadata("design:type", String)
], FeedbackDB.prototype, "profile_image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], FeedbackDB.prototype, "profile_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], FeedbackDB.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.StatusPublishEnum,
        default: enums_1.StatusPublishEnum.DRAFT,
    }),
    __metadata("design:type", String)
], FeedbackDB.prototype, "status_publish", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], FeedbackDB.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], FeedbackDB.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], FeedbackDB.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], FeedbackDB.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], FeedbackDB.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], FeedbackDB.prototype, "deleted_by", void 0);
exports.FeedbackDB = FeedbackDB = __decorate([
    (0, typeorm_1.Entity)({ name: 'feedback' })
], FeedbackDB);
//# sourceMappingURL=feedback.entity.js.map