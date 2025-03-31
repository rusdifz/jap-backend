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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const common_2 = require("../../../common");
const endpoint_swagger_1 = require("./swaggers/endpoint.swagger");
const request_dto_1 = require("./dto/request.dto");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
    }
    async login(body) {
        console.log('this auth');
        return await this.service.login(body);
    }
    async create(user, body) {
        return await this.service.signup(body, user);
    }
    async changePassword(body) {
        return await this.service.changePassword(body);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'endpoint login' }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, swagger_1.ApiOkResponse)(endpoint_swagger_1.swgLoginOK),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    (0, common_1.Version)('1'),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.AuthDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'endpoint create new user' }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, swagger_1.ApiOkResponse)(endpoint_swagger_1.swgSignupOK),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    (0, common_1.Version)('1'),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_2.UserAuth)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.ReqCreateUserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'endpoint change password' }),
    (0, swagger_1.ApiHeader)((0, common_2.AuthorizationHeader)(true)),
    (0, swagger_1.ApiOkResponse)(endpoint_swagger_1.swgLoginOK),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    (0, common_1.Version)('1'),
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.AuthDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, common_2.CommonHeaders)(),
    (0, swagger_1.ApiTags)('Controller Auth Module'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map