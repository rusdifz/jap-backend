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
exports.PopularLocationService = void 0;
const common_1 = require("@nestjs/common");
const popular_location_repository_1 = require("./popular-location.repository");
const view_mapping_1 = require("./mappings/view.mapping");
let PopularLocationService = class PopularLocationService {
    constructor(repository) {
        this.repository = repository;
    }
    async getList() {
        const query = {
            where: {
                activate_home: true,
            },
            order: {
                position: 'ASC',
            },
            take: 6,
            skip: 0,
        };
        const findData = await this.repository.findAndCount(query);
        const respData = findData.length > 0 ? await (0, view_mapping_1.mapDbToResList)(findData[0]) : [];
        return { data: respData, count: findData[1] };
    }
};
exports.PopularLocationService = PopularLocationService;
exports.PopularLocationService = PopularLocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [popular_location_repository_1.PopularLocationsRepository])
], PopularLocationService);
//# sourceMappingURL=popular-location.service.js.map