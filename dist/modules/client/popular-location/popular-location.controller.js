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
exports.PopularLocationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../../../common");
const popular_location_service_1 = require("./popular-location.service");
let PopularLocationController = class PopularLocationController {
    constructor(service) {
        this.service = service;
    }
    async getList() {
        return await this.service.getList();
    }
};
exports.PopularLocationController = PopularLocationController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'endpoint get popular location',
        description: '',
    }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, common_1.Version)('1'),
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PopularLocationController.prototype, "getList", null);
exports.PopularLocationController = PopularLocationController = __decorate([
    (0, common_1.Controller)('client/popular-location'),
    __metadata("design:paramtypes", [popular_location_service_1.PopularLocationService])
], PopularLocationController);
//# sourceMappingURL=popular-location.controller.js.map