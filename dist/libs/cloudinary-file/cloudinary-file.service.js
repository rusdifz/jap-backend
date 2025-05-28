"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryFileService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const streamifier = require('streamifier');
const sharp = require('sharp');
let CloudinaryFileService = class CloudinaryFileService {
    async FileUpload(file, folder_name) {
        const resizedBuffer = await sharp(file.buffer)
            .resize({ width: 800, height: 600, fit: 'inside' })
            .toBuffer();
        return new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({
                folder: 'jardine-asia-pasific/' + folder_name,
                transformation: [{ quality: 'auto', fetch_format: 'auto' }],
                eager: [{ width: 1200, quality: 'auto', fetch_format: 'auto' }],
                eager_async: true,
            }, (error, result) => {
                if (error) {
                    console.log('error', error);
                    reject(error);
                }
                else
                    resolve(result);
            });
            stream.end(resizedBuffer);
        });
    }
    async deleteFiled(public_id) {
        return await cloudinary_1.v2.api.delete_resources([public_id], {
            resource_type: 'image',
        });
    }
};
exports.CloudinaryFileService = CloudinaryFileService;
exports.CloudinaryFileService = CloudinaryFileService = __decorate([
    (0, common_1.Injectable)()
], CloudinaryFileService);
//# sourceMappingURL=cloudinary-file.service.js.map