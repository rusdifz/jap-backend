"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseErrorInterceptor = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../../common");
let ResponseErrorInterceptor = class ResponseErrorInterceptor {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        console.log('response', exception);
        let message = exception.message;
        console.log('error message', message);
        let status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let errorMessage = '';
        let messageObject;
        try {
            messageObject = JSON.parse(message);
        }
        catch (error) {
            errorMessage = message;
            messageObject = [];
        }
        const errorDatas = [];
        if (typeof exception.getResponse === 'function') {
            const resException = exception.getResponse();
            const errorDTOs = typeof resException === 'object'
                ? resException['message']
                : resException;
            if (Array.isArray(errorDTOs)) {
                for (const errorDTO of errorDTOs) {
                    errorDatas.push({
                        info: '',
                        message: errorDTO,
                    });
                }
            }
        }
        for (const itemError of messageObject) {
            errorMessage = itemError.message == '' ? message : itemError.message;
            let errorData = {
                info: itemError.info ?? '',
                message: errorMessage,
            };
            if (itemError.data) {
                errorData.data = itemError.data;
            }
            errorDatas.push(errorData);
        }
        let metaMsg = common_2.httpStatus[status];
        if (status == 500) {
            errorMessage = message;
            metaMsg = 'Something went wrong. Please try again.';
        }
        const responseBody = {
            meta: {
                code: status,
                msg: metaMsg,
            },
            error: errorMessage,
            error_data: errorDatas,
        };
        console.log('error response', responseBody);
        response.status(status).json(responseBody);
    }
};
exports.ResponseErrorInterceptor = ResponseErrorInterceptor;
exports.ResponseErrorInterceptor = ResponseErrorInterceptor = __decorate([
    (0, common_1.Catch)()
], ResponseErrorInterceptor);
//# sourceMappingURL=response.error.interceptor.js.map