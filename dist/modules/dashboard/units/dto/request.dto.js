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
exports.UnitListDTO = exports.ReqUpdateUnitDTO = exports.ReqCreateUnitDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("../../../../common");
class ReqCreateUnitDTO {
    constructor() {
        this.floor = '';
        this.condition = common_1.ConditionUnitEnum.BARE;
    }
}
exports.ReqCreateUnitDTO = ReqCreateUnitDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqCreateUnitDTO.prototype, "property_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 26370 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReqCreateUnitDTO.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCreateUnitDTO.prototype, "floor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: common_1.ConditionUnitEnum.BARE }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(common_1.ConditionUnitEnum, {
        message: 'Value status must be list in enum',
    }),
    __metadata("design:type", String)
], ReqCreateUnitDTO.prototype, "condition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ReqCreateUnitDTO.prototype, "available", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 26370 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqCreateUnitDTO.prototype, "rent_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: common_1.PropertyStatusEnum.LEASE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(common_1.PropertyStatusEnum, {
        message: 'Value status must be list in enum',
    }),
    __metadata("design:type", String)
], ReqCreateUnitDTO.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCreateUnitDTO.prototype, "pic_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCreateUnitDTO.prototype, "pic_phone", void 0);
class ReqUpdateUnitDTO extends ReqCreateUnitDTO {
}
exports.ReqUpdateUnitDTO = ReqUpdateUnitDTO;
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqUpdateUnitDTO.prototype, "unit_id", void 0);
class UnitListDTO extends common_1.PaginationDTO {
}
exports.UnitListDTO = UnitListDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UnitListDTO.prototype, "property_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UnitListDTO.prototype, "status", void 0);
//# sourceMappingURL=request.dto.js.map