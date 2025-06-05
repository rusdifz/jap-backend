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
exports.PropertyDetailDTO = exports.PropertiesDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const common_1 = require("../../../../common");
class PropertiesDTO extends common_1.PaginationDTO {
}
exports.PropertiesDTO = PropertiesDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PropertiesDTO.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PropertiesDTO.prototype, "property_type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PropertiesDTO.prototype, "property_status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PropertiesDTO.prototype, "amenities", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.toLowerCase()),
    __metadata("design:type", String)
], PropertiesDTO.prototype, "search_keyword", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PropertiesDTO.prototype, "id_except", void 0);
class PropertyDetailDTO {
}
exports.PropertyDetailDTO = PropertyDetailDTO;
__decorate([
    (0, class_validator_1.ValidateIf)((o) => !o.slug),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PropertyDetailDTO.prototype, "property_id", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => !o.property_id),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PropertyDetailDTO.prototype, "slug", void 0);
//# sourceMappingURL=request.dto.js.map