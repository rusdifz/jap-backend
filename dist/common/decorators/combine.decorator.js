"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyParam = void 0;
const common_1 = require("@nestjs/common");
exports.BodyParam = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return { ...req.body, ...req.params };
});
//# sourceMappingURL=combine.decorator.js.map