"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardImagesService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const images_repository_1 = require("./images.repository");
const upsert_mapping_1 = require("./mappings/upsert.mapping");
let DashboardImagesService = class DashboardImagesService {
    constructor(repository) {
        this.repository = repository;
    }
    async uploadImage(files, property_id) {
        const checkDataExist = await this.repository.find({
            where: { property_id },
        });
        if (checkDataExist.length > 0) {
            for (const exist of checkDataExist) {
                await this.repository.delete({ media_id: exist.media_id });
                const filePath = exist.path + '/' + exist.name;
                if ((0, fs_1.existsSync)(filePath)) {
                    console.log('exist', filePath);
                    (0, fs_1.unlinkSync)(filePath);
                }
            }
        }
        if (files.length > 0) {
            const resp = [];
            for (const file of files) {
                const mapData = await (0, upsert_mapping_1.mapInsertDB)(file, property_id);
                const saveData = await this.repository.save(mapData);
                resp.push(saveData);
            }
            return resp;
        }
        return null;
    }
    async getImage(image_name) {
        const whitelist = ['.jpeg', '.jpg', '.png'];
        if (whitelist.includes(image_name)) {
            throw new common_1.HttpException('wrong file type', common_1.HttpStatus.BAD_REQUEST);
        }
        const getData = await this.repository.findOneBy({ name: image_name });
        if (getData) {
            const path = getData.path + '/' + image_name;
            if ((0, fs_1.existsSync)(path)) {
                return path;
            }
        }
        throw new common_1.HttpException('Data Not Found', common_1.HttpStatus.NOT_FOUND);
    }
};
exports.DashboardImagesService = DashboardImagesService;
exports.DashboardImagesService = DashboardImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [images_repository_1.DashboardImageRepository])
], DashboardImagesService);
//# sourceMappingURL=images.service.js.map