"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSuccessInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const common_2 = require("../../common");
let ResponseSuccessInterceptor = class ResponseSuccessInterceptor {
    async intercept(context, next) {
        const ctx = context.switchToHttp();
        const query = ctx.getRequest().query;
        return next.handle().pipe((0, rxjs_1.map)(async (response) => {
            const resp = await response;
            context.switchToHttp().getResponse().status(200);
            let httpSuccess = (0, common_2.statusOK)(200, resp);
            if (!resp) {
                return httpSuccess;
            }
            if (Array.isArray(resp.data)) {
                let page = query.page ? parseInt(query.page) : 1;
                let limit = query.limit ? parseInt(query.limit) : 5;
                let pagination = {
                    page: page,
                    total: resp.count,
                    total_page: Math.ceil(resp.count / limit),
                };
                httpSuccess = (0, common_2.statusOK)(200, resp.data);
                Object.assign(httpSuccess, { pagination });
            }
            return httpSuccess;
        }));
    }
};
exports.ResponseSuccessInterceptor = ResponseSuccessInterceptor;
exports.ResponseSuccessInterceptor = ResponseSuccessInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseSuccessInterceptor);
//# sourceMappingURL=response.success.interceptor.js.map