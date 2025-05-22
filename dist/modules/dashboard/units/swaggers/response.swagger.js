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
exports.SwgUpdateUnit = exports.SwgCreateUnit = exports.SwgDetailUnit = exports.SwgListunit = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("../../../../common");
const response_dto_1 = require("../dto/response.dto");
const request_dto_1 = require("../dto/request.dto");
class SwgListunit {
}
exports.SwgListunit = SwgListunit;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", common_1.Meta)
], SwgListunit.prototype, "meta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [response_dto_1.ResUnit] }),
    __metadata("design:type", Array)
], SwgListunit.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: common_1.Pagination }),
    __metadata("design:type", common_1.Pagination)
], SwgListunit.prototype, "pagination", void 0);
class SwgDetailUnit {
}
exports.SwgDetailUnit = SwgDetailUnit;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", common_1.Meta)
], SwgDetailUnit.prototype, "meta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: response_dto_1.ResUnit, example: response_dto_1.ResUnit }),
    __metadata("design:type", response_dto_1.ResUnit)
], SwgDetailUnit.prototype, "data", void 0);
class SwgCreateUnit {
}
exports.SwgCreateUnit = SwgCreateUnit;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", common_1.MetaUpsert)
], SwgCreateUnit.prototype, "meta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: request_dto_1.ReqCreateUnitDTO }),
    __metadata("design:type", request_dto_1.ReqCreateUnitDTO)
], SwgCreateUnit.prototype, "data", void 0);
class SwgUpdateUnit {
}
exports.SwgUpdateUnit = SwgUpdateUnit;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", common_1.MetaUpsert)
], SwgUpdateUnit.prototype, "meta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: request_dto_1.ReqUpdateUnitDTO }),
    __metadata("design:type", request_dto_1.ReqUpdateUnitDTO)
], SwgUpdateUnit.prototype, "data", void 0);
//# sourceMappingURL=response.swagger.js.map