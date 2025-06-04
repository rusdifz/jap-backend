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
exports.MediaDB = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const property_entity_1 = require("./property.entity");
let MediaDB = class MediaDB {
};
exports.MediaDB = MediaDB;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MediaDB.prototype, "media_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', default: 0 }),
    __metadata("design:type", Number)
], MediaDB.prototype, "reference_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.MediaReferenceType,
        default: enums_1.MediaReferenceType.PROPERTY,
    }),
    __metadata("design:type", String)
], MediaDB.prototype, "reference_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], MediaDB.prototype, "host", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], MediaDB.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], MediaDB.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], MediaDB.prototype, "public_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.MediaTypeEnum,
        default: enums_1.MediaTypeEnum.IMAGE,
    }),
    __metadata("design:type", String)
], MediaDB.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.MimeTypeEnum,
        default: enums_1.MimeTypeEnum.JPG,
    }),
    __metadata("design:type", String)
], MediaDB.prototype, "mimetype", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], MediaDB.prototype, "full_url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], MediaDB.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MediaDB.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MediaDB.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.PropertiesDB, (property) => property.images, {
        createForeignKeyConstraints: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'reference_id', referencedColumnName: 'property_id' }),
    __metadata("design:type", property_entity_1.PropertiesDB)
], MediaDB.prototype, "property", void 0);
exports.MediaDB = MediaDB = __decorate([
    (0, typeorm_1.Entity)({ name: 'media' })
], MediaDB);
//# sourceMappingURL=media.entity.js.map