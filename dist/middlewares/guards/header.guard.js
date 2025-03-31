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
exports.CommonHeaderGuard = void 0;
const common_1 = require("@nestjs/common");
let CommonHeaderGuard = class CommonHeaderGuard {
    constructor() { }
    async canActivate(context) {
        const request = await context.switchToHttp().getRequest();
        const apiKey = request.headers['api-key'];
        if (!apiKey) {
            throw new common_1.HttpException('not allowed to access the system', 405);
        }
        if (apiKey != 'https://rb.gy/1e7y4t') {
            throw new common_1.HttpException('Invalid Key', common_1.HttpStatus.FORBIDDEN);
        }
        return true;
    }
};
exports.CommonHeaderGuard = CommonHeaderGuard;
exports.CommonHeaderGuard = CommonHeaderGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CommonHeaderGuard);
//# sourceMappingURL=header.guard.js.map