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
exports.SwgCreateProperty = exports.SwgDetailProperty = exports.SwgListOffice = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("../../../../common");
const request_dto_1 = require("../dto/request.dto");
const response_dto_1 = require("../dto/response.dto");
class SwgListOffice {
}
exports.SwgListOffice = SwgListOffice;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", common_1.Meta)
], SwgListOffice.prototype, "meta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [response_dto_1.ResProperty] }),
    __metadata("design:type", Array)
], SwgListOffice.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: common_1.Pagination }),
    __metadata("design:type", common_1.Pagination)
], SwgListOffice.prototype, "pagination", void 0);
class SwgDetailProperty {
}
exports.SwgDetailProperty = SwgDetailProperty;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", common_1.Meta)
], SwgDetailProperty.prototype, "meta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: response_dto_1.ResProperty, example: response_dto_1.ResProperty }),
    __metadata("design:type", response_dto_1.ResProperty)
], SwgDetailProperty.prototype, "data", void 0);
class SwgCreateProperty {
}
exports.SwgCreateProperty = SwgCreateProperty;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", common_1.MetaUpsert)
], SwgCreateProperty.prototype, "meta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: request_dto_1.ReqCreatePropertyDTO, example: request_dto_1.ReqCreatePropertyDTO }),
    __metadata("design:type", request_dto_1.ReqCreatePropertyDTO)
], SwgCreateProperty.prototype, "data", void 0);
//# sourceMappingURL=response.swagger.js.map