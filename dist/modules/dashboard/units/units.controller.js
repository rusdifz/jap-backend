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
exports.DashboardUnitsController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../../middlewares/guards/auth.guard");
const endpoint_swagger_1 = require("./swaggers/endpoint.swagger");
const common_2 = require("../../../common");
const units_service_1 = require("./units.service");
const request_dto_1 = require("./dto/request.dto");
let DashboardUnitsController = class DashboardUnitsController {
    constructor(service) {
        this.service = service;
    }
    async getDetail(id) {
        return await this.service.getDetail(id);
    }
    async getList(query) {
        return await this.service.getList(query);
    }
    async create(user, body) {
        return await this.service.create(body, user);
    }
    async update(user, body) {
        console.log('body unit', body);
        return await this.service.update(body, user);
    }
    async deleteOne(user, id) {
        return await this.service.delete(id, user);
    }
};
exports.DashboardUnitsController = DashboardUnitsController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint get unit detail',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, common_1.Version)('1'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardUnitsController.prototype, "getDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint get unit list',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, common_1.Version)('1'),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.UnitListDTO]),
    __metadata("design:returntype", Promise)
], DashboardUnitsController.prototype, "getList", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint create unit',
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
    __metadata("design:paramtypes", [Object, request_dto_1.ReqCreateUnitDTO]),
    __metadata("design:returntype", Promise)
], DashboardUnitsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint update unit',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, swagger_1.ApiCreatedResponse)(endpoint_swagger_1.swgUpdateOK),
    (0, common_1.Version)('1'),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    (0, common_1.Put)(':unit_id'),
    __param(0, (0, common_2.UserAuth)()),
    __param(1, (0, common_2.BodyParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.ReqUpdateUnitDTO]),
    __metadata("design:returntype", Promise)
], DashboardUnitsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint delete unit',
        description: '',
    }),
    (0, common_1.Version)('1'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_2.UserAuth)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DashboardUnitsController.prototype, "deleteOne", null);
exports.DashboardUnitsController = DashboardUnitsController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('dashboard/units'),
    __metadata("design:paramtypes", [units_service_1.DashboardUnitsService])
], DashboardUnitsController);
//# sourceMappingURL=units.controller.js.map