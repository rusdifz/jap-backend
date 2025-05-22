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
exports.ClientPropertiesController = void 0;
const common_1 = require("@nestjs/common");
const request_dto_1 = require("./dto/request.dto");
const properties_service_1 = require("./properties.service");
let ClientPropertiesController = class ClientPropertiesController {
    constructor(service) {
        this.service = service;
    }
    async getDetail(slug) {
        return await this.service.getDetail(slug);
    }
    async getList(query) {
        return await this.service.getList(query);
    }
};
exports.ClientPropertiesController = ClientPropertiesController;
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientPropertiesController.prototype, "getDetail", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.PropertiesDTO]),
    __metadata("design:returntype", Promise)
], ClientPropertiesController.prototype, "getList", null);
exports.ClientPropertiesController = ClientPropertiesController = __decorate([
    (0, common_1.Controller)('client/properties'),
    __metadata("design:paramtypes", [properties_service_1.ClientPropertiesService])
], ClientPropertiesController);
//# sourceMappingURL=properties.controller.js.map