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
exports.SwgLogin = exports.SwgSignup = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("../../../../common");
const request_dto_1 = require("../dto/request.dto");
class SwgSignup {
}
exports.SwgSignup = SwgSignup;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", common_1.Meta)
], SwgSignup.prototype, "meta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: request_dto_1.ReqCreateUserDTO, example: request_dto_1.ReqCreateUserDTO }),
    __metadata("design:type", request_dto_1.ReqCreateUserDTO)
], SwgSignup.prototype, "data", void 0);
class SwgLogin {
}
exports.SwgLogin = SwgLogin;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", common_1.Meta)
], SwgLogin.prototype, "meta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbHdhIiwiZW1haWwiOiJzYWx3YTIwQGdtYWlsLmNvbSIsImlzX3ZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNzM3MDI4MjIzfQ.czgprych6ws6ukuvCdQmWtgC_9Stvfs5gMN4ts5iBBU',
    }),
    __metadata("design:type", Object)
], SwgLogin.prototype, "data", void 0);
//# sourceMappingURL=response.swagger.js.map