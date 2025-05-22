"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToBase64 = ToBase64;
exports.FromBase64 = FromBase64;
exports.ToMD5 = ToMD5;
exports.ToSHA256 = ToSHA256;
const crypto = require("crypto");
async function ToBase64(str) {
    return Buffer.from(str, 'utf8').toString('base64');
}
async function FromBase64(str) {
    return Buffer.from(str, 'base64').toString('utf8');
}
async function ToMD5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}
async function ToSHA256(str, key) {
    return crypto.createHmac('sha256', key).update(str).digest('hex');
}
//# sourceMappingURL=crypto.js.map