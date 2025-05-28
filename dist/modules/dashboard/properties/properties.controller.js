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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardPropertiesController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const swagger_1 = require("@nestjs/swagger");
const request_dto_1 = require("./dto/request.dto");
const endpoint_swagger_1 = require("./swaggers/endpoint.swagger");
const common_2 = require("../../../common");
const auth_guard_1 = require("../../../middlewares/guards/auth.guard");
const request_dto_2 = require("./dto/request.dto");
const properties_service_1 = require("./services/properties.service");
const properties_generate_file_service_1 = require("./services/properties-generate-file.service");
let DashboardPropertiesController = class DashboardPropertiesController {
    constructor(service, serviceGenerateFile) {
        this.service = service;
        this.serviceGenerateFile = serviceGenerateFile;
    }
    async getDetail(id) {
        return await this.service.get(id);
    }
    async getList(query) {
        return await this.service.getList(query);
    }
    async create(user, body) {
        return await this.service.create(body, user);
    }
    async update(user, bodyparam) {
        return await this.service.update(bodyparam, user);
    }
    async deleteOne(id, user) {
        return await this.service.delete(id, user);
    }
    async getListPic(query) {
        return await this.service.getListPic(query);
    }
    async createPic(user, body) {
        return await this.service.createPic(body, user);
    }
    async updatePic(user, bodyparam) {
        return await this.service.updatePic(bodyparam, user);
    }
    async deleteOnePic(id, user) {
        return await this.service.deletePic(id, user);
    }
    async checkForStaleDataOlderThanOneMonth() {
        return await this.service.checkForStaleDataOlderThanOneMonth();
    }
    async convertFileExcelToDB() {
        return await this.service.inputBulkFromExcel();
    }
    async generatePdfComparisson(res, location, query, user) {
        console.log('query comparisson', query);
        console.log('user', user);
        const pdfBuffer = await this.serviceGenerateFile.generatePDFComparisson(query.property_id, user);
        const namePdf = 'Building Comparisson - ' + location;
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${namePdf}.pdf"`,
        });
        res.send(pdfBuffer);
    }
    async generatePdfComparissonNew(res, body, user) {
        console.log('body pdf', body);
        console.log('user', user);
        const pdfBuffer = await this.serviceGenerateFile.generatePDFComparissonNew(body, user);
        const namePdf = 'Building Comparisson - ' + body.location;
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${namePdf}.pdf"`,
        });
        res.send(pdfBuffer);
    }
    async generatePdfPropertyDetail(res, slug) {
        const pdfBuffer = await this.serviceGenerateFile.generatePDFDetailProperty(slug);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${slug}.pdf"`,
        });
        res.send(pdfBuffer);
    }
    async generatePdfPropertyDetailNew(res, body) {
        console.log('body', body);
        const pdfBuffer = await this.serviceGenerateFile.generatePDFDetailPropertyDetail(body);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="property-detail-${body.location ?? ''}.pdf"`,
        });
        res.send(pdfBuffer);
    }
};
exports.DashboardPropertiesController = DashboardPropertiesController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint get office detail',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, swagger_1.ApiOkResponse)(endpoint_swagger_1.swgGetDetailOK),
    (0, common_1.Version)('1'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardPropertiesController.prototype, "getDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint get office list',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, swagger_1.ApiOkResponse)(endpoint_swagger_1.swgGetListOK),
    (0, common_1.Version)('1'),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_2.PropertiesDTO]),
    __metadata("design:returntype", Promise)
], DashboardPropertiesController.prototype, "getList", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint create office',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, swagger_1.ApiCreatedResponse)(endpoint_swagger_1.swgCreateOK),
    (0, common_1.Version)('1'),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    (0, common_1.Post)(''),
    __param(0, (0, common_2.UserAuth)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.ReqCreatePropertyDTO]),
    __metadata("design:returntype", Promise)
], DashboardPropertiesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint update office',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, swagger_1.ApiCreatedResponse)(endpoint_swagger_1.swgCreateOK),
    (0, common_1.Version)('1'),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_2.UserAuth)()),
    __param(1, (0, common_2.BodyParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.ReqUpdatePropertyDTO]),
    __metadata("design:returntype", Promise)
], DashboardPropertiesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint delete office',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, common_1.Version)('1'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_2.UserAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DashboardPropertiesController.prototype, "deleteOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint get office list',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, common_1.Version)('1'),
    (0, common_1.Get)('prop/pic'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.ReqGetPicListDTO]),
    __metadata("design:returntype", Promise)
], DashboardPropertiesController.prototype, "getListPic", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint create pic property',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, common_1.Version)('1'),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    (0, common_1.Post)('prop/pic'),
    __param(0, (0, common_2.UserAuth)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.ReqCreatePropertyPicDTO]),
    __metadata("design:returntype", Promise)
], DashboardPropertiesController.prototype, "createPic", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint update property pic',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, common_1.Version)('1'),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    (0, common_1.Put)('prop/pic/:id'),
    __param(0, (0, common_2.UserAuth)()),
    __param(1, (0, common_2.BodyParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.ReqUpdatePropertyPicDTO]),
    __metadata("design:returntype", Promise)
], DashboardPropertiesController.prototype, "updatePic", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint delete office',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, common_1.Version)('1'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    (0, common_1.Delete)('prop/pic/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_2.UserAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DashboardPropertiesController.prototype, "deleteOnePic", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('older-data/one-month'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardPropertiesController.prototype, "checkForStaleDataOlderThanOneMonth", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('excel/convert'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardPropertiesController.prototype, "convertFileExcelToDB", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('pdf/comparisson/:location'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('location')),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_2.UserAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, request_dto_1.GeneratePDFDTO, Object]),
    __metadata("design:returntype", Promise)
], DashboardPropertiesController.prototype, "generatePdfComparisson", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)('pdf/comparison'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_2.UserAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.PdfComparisonDTO, Object]),
    __metadata("design:returntype", Promise)
], DashboardPropertiesController.prototype, "generatePdfComparissonNew", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('pdf/detail/:slug'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DashboardPropertiesController.prototype, "generatePdfPropertyDetail", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Post)('pdf/detail'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.PdfDetailDTO]),
    __metadata("design:returntype", Promise)
], DashboardPropertiesController.prototype, "generatePdfPropertyDetailNew", null);
exports.DashboardPropertiesController = DashboardPropertiesController = __decorate([
    (0, common_1.Controller)('dashboard/properties'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [properties_service_1.DashboardPropertiesService,
        properties_generate_file_service_1.DashboardPropertiesGenerateFileService])
], DashboardPropertiesController);
//# sourceMappingURL=properties.controller.js.map