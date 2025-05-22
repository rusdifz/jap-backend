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
exports.DashboardMasterLocationController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../../../common");
const master_location_service_1 = require("./master-location.service");
const request_dto_1 = require("./dto/request.dto");
const auth_guard_1 = require("../../../middlewares/guards/auth.guard");
let DashboardMasterLocationController = class DashboardMasterLocationController {
    constructor(service) {
        this.service = service;
    }
    async create(user, body) {
        console.log('user', user);
        return await this.service.create(body, user);
    }
    async update(user, bodyparam) {
        return await this.service.update(bodyparam, user);
    }
    async deleteOne(id, user) {
        return await this.service.delete(id, user);
    }
    async getDetail(id) {
        return await this.service.getDetail(id);
    }
    async getList(query) {
        return await this.service.getList(query);
    }
};
exports.DashboardMasterLocationController = DashboardMasterLocationController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint create master location',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, common_1.Version)('1'),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    (0, common_1.Post)(''),
    __param(0, (0, common_2.UserAuth)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.ReqCreateMasterLocationDTO]),
    __metadata("design:returntype", Promise)
], DashboardMasterLocationController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint update master location',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, common_1.Version)('1'),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_2.UserAuth)()),
    __param(1, (0, common_2.BodyParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.ReqUpdateMasterLocationDTO]),
    __metadata("design:returntype", Promise)
], DashboardMasterLocationController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint delete master location',
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
], DashboardMasterLocationController.prototype, "deleteOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint get Master Location',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, common_1.Version)('1'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DashboardMasterLocationController.prototype, "getDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint get office list',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, common_1.Version)('1'),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.PaginationDTO]),
    __metadata("design:returntype", Promise)
], DashboardMasterLocationController.prototype, "getList", null);
exports.DashboardMasterLocationController = DashboardMasterLocationController = __decorate([
    (0, common_1.Controller)('dashboard/master-location'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [master_location_service_1.DashboardMasterLocationService])
], DashboardMasterLocationController);
//# sourceMappingURL=master-location.controller.js.map