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
exports.ReqCreateUserDTO = exports.AuthDTO = void 0;
const common_1 = require("../../../../common");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class AuthDTO {
}
exports.AuthDTO = AuthDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'rusdifz' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fauzanrusdi20@gmail.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Testpass98_' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthDTO.prototype, "password", void 0);
class ReqCreateUserDTO {
}
exports.ReqCreateUserDTO = ReqCreateUserDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'rusdifz' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, common_1.IsUnique)(common_1.UsersDB, 'username', {
        message: 'username already exists ',
    }),
    __metadata("design:type", String)
], ReqCreateUserDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fauzanrusdi20@gmail.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ReqCreateUserDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Testpass98_' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCreateUserDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: common_1.RoleEnum.ADMIN }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(common_1.RoleEnum, {
        message: 'Value status must be list in enum',
    }),
    __metadata("design:type", String)
], ReqCreateUserDTO.prototype, "role", void 0);
//# sourceMappingURL=request.dto.js.map