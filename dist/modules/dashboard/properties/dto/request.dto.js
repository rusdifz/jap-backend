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
exports.ReqGetPicListDTO = exports.ReqUpdatePropertyPicDTO = exports.ReqCreatePropertyPicDTO = exports.PdfDetailDTO = exports.PdfComparisonDTO = exports.GeneratePDFDTO = exports.PropertyDetailDTO = exports.PropertiesDTO = exports.ReqUpdatePropertyDTO = exports.ReqCreatePropertyDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("../../../../common");
class OvertimePrice {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '210000' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OvertimePrice.prototype, "electricity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '210000' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OvertimePrice.prototype, "lighting", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '210000' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OvertimePrice.prototype, "ac", void 0);
class ParkingChargeDetail {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 200000 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ParkingChargeDetail.prototype, "car", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 100000 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ParkingChargeDetail.prototype, "motorcycle", void 0);
class ParkingCharge {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ParkingChargeDetail),
    __metadata("design:type", ParkingChargeDetail)
], ParkingCharge.prototype, "reserved", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ParkingChargeDetail),
    __metadata("design:type", ParkingChargeDetail)
], ParkingCharge.prototype, "unreserved", void 0);
class Price {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1000000' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Price.prototype, "phone_deposit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1000000' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Price.prototype, "booking_deposit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1000000' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Price.prototype, "security_deposit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OvertimePrice),
    __metadata("design:type", OvertimePrice)
], Price.prototype, "overtime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 300000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Price.prototype, "ground_floor_sqm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 210000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Price.prototype, "rent_sqm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            price: 127500.0,
            info: 'Include AC during office hour, Lighting & Electricity is separately metered',
        },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], Price.prototype, "service_charge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ParkingCharge),
    __metadata("design:type", ParkingCharge)
], Price.prototype, "parking_charge", void 0);
class Spesification {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 16900.0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Spesification.prototype, "property_size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '08.00 AM - 06.00 PM' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Spesification.prototype, "office_hours_weekday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '08.00 AM - 01.00 PM' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Spesification.prototype, "office_hours_weekend", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Spesification.prototype, "total_floor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 900.0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Spesification.prototype, "size_floor", void 0);
class Nearby {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Halte Busway Gatot Subroto' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Nearby.prototype, "bus_station", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rs Siloam' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Nearby.prototype, "hospital", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Polsek Jakarta Selatan' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Nearby.prototype, "police", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bellagio Boutique Mall' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Nearby.prototype, "mall", void 0);
class Terms {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Terms.prototype, "minium_lease", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Terms.prototype, "payment", void 0);
class Telecommunication {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], Telecommunication.prototype, "isp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], Telecommunication.prototype, "fiber_optic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], Telecommunication.prototype, "wifi", void 0);
class FireSafety {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FireSafety.prototype, "sprinkle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FireSafety.prototype, "heat_detector", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FireSafety.prototype, "smoke_detector", void 0);
class OtherInfo {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OtherInfo.prototype, "loading_capacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OtherInfo.prototype, "ac_system", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OtherInfo.prototype, "ac_zoning", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OtherInfo.prototype, "electricity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OtherInfo.prototype, "power_unit", void 0);
class ReqCreatePropertyDTO {
}
exports.ReqCreatePropertyDTO = ReqCreatePropertyDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Thamrin Building' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, common_1.IsUnique)(common_1.PropertiesDB, 'name', { message: 'Duplicate name Property' }),
    __metadata("design:type", String)
], ReqCreatePropertyDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqCreatePropertyDTO.prototype, "popular", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Lorem ipsum jaya abadi' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCreatePropertyDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: `Alam Sutera, Jl. Jalur Sutera Boulevard No.1, RT.002/RW.006, 
    Panunggangan Tim., Kec. Pinang, Kota Tangerang, Banten 15143`,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCreatePropertyDTO.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: common_1.LocationEnum.PASAR_MINGGU,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(common_1.LocationEnum, {
        message: 'Value status must be list in enum',
    }),
    __metadata("design:type", String)
], ReqCreatePropertyDTO.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'QRPC+48 Karet Kuningan, South Jakarta City, Jakarta',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCreatePropertyDTO.prototype, "koordinat_map", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: common_1.StatusPublishEnum.DRAFT }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(common_1.StatusPublishEnum, {
        message: 'Value status must be list in enum',
    }),
    __metadata("design:type", String)
], ReqCreatePropertyDTO.prototype, "status_publish", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: common_1.PropertyStatusEnum.LEASE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(common_1.PropertyStatusEnum, {
        message: 'Value status must be list in enum',
    }),
    __metadata("design:type", String)
], ReqCreatePropertyDTO.prototype, "property_status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: common_1.PropertyTypeEnum.OFFICE }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ReqCreatePropertyDTO.prototype, "property_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Q3 2015' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCreatePropertyDTO.prototype, "completion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCreatePropertyDTO.prototype, "url_youtube", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: ['A/C & Heating', 'Garages', 'Garden', 'Disabled Access'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ReqCreatePropertyDTO.prototype, "amenities", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => Price),
    __metadata("design:type", Price)
], ReqCreatePropertyDTO.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => Spesification),
    __metadata("design:type", Spesification)
], ReqCreatePropertyDTO.prototype, "spesification", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => Nearby),
    __metadata("design:type", Nearby)
], ReqCreatePropertyDTO.prototype, "nearby", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => Terms),
    __metadata("design:type", Terms)
], ReqCreatePropertyDTO.prototype, "terms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => Telecommunication),
    __metadata("design:type", Telecommunication)
], ReqCreatePropertyDTO.prototype, "telecommunication", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FireSafety),
    __metadata("design:type", FireSafety)
], ReqCreatePropertyDTO.prototype, "fire_safety", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OtherInfo),
    __metadata("design:type", OtherInfo)
], ReqCreatePropertyDTO.prototype, "other_info", void 0);
class ReqUpdatePropertyDTO extends (0, swagger_1.PartialType)(ReqCreatePropertyDTO) {
}
exports.ReqUpdatePropertyDTO = ReqUpdatePropertyDTO;
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqUpdatePropertyDTO.prototype, "property_id", void 0);
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
    (0, class_validator_1.IsEnum)(common_1.ConditionUnitEnum, { message: 'value not found' }),
    __metadata("design:type", String)
], PropertiesDTO.prototype, "condition", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PropertiesDTO.prototype, "unit_size", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PropertiesDTO.prototype, "min_rent_sqm", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PropertiesDTO.prototype, "max_rent_sqm", void 0);
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
class GeneratePDFDTO {
}
exports.GeneratePDFDTO = GeneratePDFDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], GeneratePDFDTO.prototype, "property_id", void 0);
class PdfComparisonDTO {
    constructor() {
        this.location = 'JAP';
    }
}
exports.PdfComparisonDTO = PdfComparisonDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PdfComparisonDTO.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], PdfComparisonDTO.prototype, "unit_id", void 0);
class PdfDetailDTO {
}
exports.PdfDetailDTO = PdfDetailDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PdfDetailDTO.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], PdfDetailDTO.prototype, "properties_download", void 0);
class ReqCreatePropertyPicDTO {
}
exports.ReqCreatePropertyPicDTO = ReqCreatePropertyPicDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqCreatePropertyPicDTO.prototype, "property_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fauzan' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCreatePropertyPicDTO.prototype, "pic_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '087870702538' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqCreatePropertyPicDTO.prototype, "pic_phone", void 0);
class ReqUpdatePropertyPicDTO extends (0, swagger_1.PartialType)(ReqCreatePropertyPicDTO) {
}
exports.ReqUpdatePropertyPicDTO = ReqUpdatePropertyPicDTO;
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReqUpdatePropertyPicDTO.prototype, "pic_id", void 0);
class ReqGetPicListDTO extends common_1.PaginationDTO {
}
exports.ReqGetPicListDTO = ReqGetPicListDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ReqGetPicListDTO.prototype, "property_id", void 0);
//# sourceMappingURL=request.dto.js.map