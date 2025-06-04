"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummyError = dummyError;
const common_1 = require("@nestjs/common");
function dummyError(error) {
    if (error == 'internal_server_error') {
        throw new common_1.InternalServerErrorException('Something went wrong');
    }
    if (error == 'forbidden') {
        throw new common_1.ForbiddenException('Forbidden');
    }
    if (error == 'not_found') {
        throw new common_1.NotFoundException('Data not found');
    }
    if (error == 'unauthorized') {
        throw new common_1.NotFoundException('Unauthorized');
    }
}
//# sourceMappingURL=dummy-error.js.map