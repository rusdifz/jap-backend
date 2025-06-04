"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusOK = statusOK;
exports.statusError = statusError;
function statusOK(code, data) {
    return {
        meta: {
            code: code ? code : 200,
            msg: 'success',
        },
        data: data,
    };
}
function statusError(code, msg, err) {
    return {
        meta: {
            code: code,
            msg: msg,
        },
        error: err,
    };
}
//# sourceMappingURL=http.js.map