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
exports.GetListFeedbackDTO = exports.ReqUpdateFeedbackDTO = exports.ReqCreateFeedbackDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("../../../../common");
class ReqCreateFeedbackDTO {
}
exports.ReqCreateFeedbackDTO = ReqCreateFeedbackDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://url' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCreateFeedbackDTO.prototype, "profile_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fauzan rusdi' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCreateFeedbackDTO.prototype, "profile_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sangat Bagus Sejauh Ini' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCreateFeedbackDTO.prototype, "comment", void 0);
class ReqUpdateFeedbackDTO extends ReqCreateFeedbackDTO {
}
exports.ReqUpdateFeedbackDTO = ReqUpdateFeedbackDTO;
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqUpdateFeedbackDTO.prototype, "feedback_id", void 0);
class GetListFeedbackDTO extends common_1.PaginationDTO {
}
exports.GetListFeedbackDTO = GetListFeedbackDTO;
//# sourceMappingURL=request.dto.js.map