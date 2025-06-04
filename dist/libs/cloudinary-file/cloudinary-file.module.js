"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryFileModule = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_config_1 = require("../../config/cloudinary/cloudinary.config");
const cloudinary_file_service_1 = require("./cloudinary-file.service");
let CloudinaryFileModule = class CloudinaryFileModule {
};
exports.CloudinaryFileModule = CloudinaryFileModule;
exports.CloudinaryFileModule = CloudinaryFileModule = __decorate([
    (0, common_1.Module)({
        providers: [cloudinary_config_1.CloudinaryProvider, cloudinary_file_service_1.CloudinaryFileService],
        exports: [cloudinary_file_service_1.CloudinaryFileService],
    })
], CloudinaryFileModule);
//# sourceMappingURL=cloudinary-file.module.js.map