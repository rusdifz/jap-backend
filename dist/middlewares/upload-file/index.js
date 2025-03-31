"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageInterceptor = exports.storageImage = exports.filterImage = void 0;
const common_1 = require("@nestjs/common");
const multer = require("multer");
const fs_1 = require("fs");
const uuid_1 = require("uuid");
const common_2 = require("../../common");
const path = require('path');
const filterImage = (req, file, cb) => {
    const whitelist = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/heic',
        'video/mp4',
        'video/mpeg',
        'video/webm',
    ];
    if (!whitelist.includes(file.mimetype)) {
        return cb(new common_1.HttpException('file is not allowed', common_1.HttpStatus.BAD_REQUEST), null);
    }
    console.log('after whitelist');
    return cb(null, true);
};
exports.filterImage = filterImage;
exports.storageImage = multer.diskStorage({
    destination: (req, file, callback) => {
        const propertyName = req.params.slug;
        console.log('sini', propertyName);
        const directory = file.mimetype.includes('image')
            ? 'public/images/' + propertyName
            : 'public/videos/' + propertyName;
        console.log('dir', directory);
        console.log('asas', __dirname);
        const dirname = __dirname
            .toString()
            .replace('dist/middlewares/upload-file', directory);
        console.log('driname', dirname);
        if (!(0, fs_1.existsSync)(dirname)) {
            console.log('Directory Image Not Exist.');
            (0, fs_1.mkdirSync)(dirname);
            callback(null, dirname);
        }
        console.log('Directory Image Exists.');
        callback(null, dirname);
    },
    filename: (req, file, callback) => {
        const timestamp = (0, common_2.dayjs)().format('YYMMDDHHmmss');
        const shortUuid = (0, uuid_1.v4)().replace(/-/g, '').slice(0, 6);
        const ext = path.extname(file.originalname);
        const filename = `${timestamp}-${shortUuid}-${ext}`;
        callback(null, filename);
    },
});
exports.uploadImageInterceptor = {
    storage: exports.storageImage,
    fileFilter: exports.filterImage,
    limits: { fileSize: 50 * 1024 * 1024 },
};
//# sourceMappingURL=index.js.map