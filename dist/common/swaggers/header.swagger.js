"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationHeader = void 0;
exports.CommonHeaders = CommonHeaders;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function CommonHeaders() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiHeader)({
        name: 'api-key',
        example: 'razfz-s4lw0a1',
        examples: {
            'api-key': {
                summary: 'api-key',
                value: 'razfz-s4lw0a1',
            },
        },
        required: true,
    }));
}
const AuthorizationHeader = (required = false) => {
    return {
        name: 'Authorization',
        required,
    };
};
exports.AuthorizationHeader = AuthorizationHeader;
//# sourceMappingURL=header.swagger.js.map