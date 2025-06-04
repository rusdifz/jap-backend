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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../../../common");
const auth_guard_1 = require("../../../middlewares/guards/auth.guard");
const request_dto_1 = require("./dto/request.dto");
const admin_service_1 = require("./admin.service");
const request_dto_2 = require("./dto/request.dto");
let AdminController = class AdminController {
    constructor(service) {
        this.service = service;
    }
    async getDetail(username) {
        return await this.service.getOne(username);
    }
    async getProfile(user) {
        return await this.service.getOne(user.user.username);
    }
    async getList(query) {
        return await this.service.getList(query);
    }
    async deleteOne(username) {
        return await this.service.delete(username);
    }
    async update(user, body) {
        return await this.service.update(body, user);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDetail", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('user/profile'),
    __param(0, (0, common_2.UserAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getList", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Delete)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteOne", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Put)('update'),
    __param(0, (0, common_2.UserAuth)()),
    __param(1, (0, common_2.BodyParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_2.ReqUpdateUserDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "update", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map