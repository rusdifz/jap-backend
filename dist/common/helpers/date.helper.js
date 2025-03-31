"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dayNow = exports.dayjs = void 0;
exports.compareInSeconds = compareInSeconds;
const dayjs = require('dayjs');
exports.dayjs = dayjs;
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
function compareInSeconds(dateA, dateB) {
    const firstDate = dayjs(dateA);
    const secondDate = dayjs(dateB);
    const diffInMilliseconds = secondDate.diff(firstDate);
    const diffInSeconds = diffInMilliseconds / 1000;
    return diffInSeconds;
}
exports.dayNow = dayjs().tz("Asia/Jakarta").format();
//# sourceMappingURL=date.helper.js.map