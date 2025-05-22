"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuth = void 0;
const common_1 = require("@nestjs/common");
exports.UserAuth = (0, common_1.createParamDecorator)((key, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('req', request?.headers);
    const user = request?.headers?.user_data;
    return user;
});
//# sourceMappingURL=user-auth.decorator.js.map