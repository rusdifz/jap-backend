"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopularLocationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_2 = require("../../../common");
const popular_location_service_1 = require("./popular-location.service");
const popular_location_repository_1 = require("./popular-location.repository");
const popular_location_controller_1 = require("./popular-location.controller");
let PopularLocationModule = class PopularLocationModule {
};
exports.PopularLocationModule = PopularLocationModule;
exports.PopularLocationModule = PopularLocationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([common_2.MasterLocationDB])],
        providers: [popular_location_repository_1.PopularLocationsRepository, popular_location_service_1.PopularLocationService],
        controllers: [popular_location_controller_1.PopularLocationController],
    })
], PopularLocationModule);
//# sourceMappingURL=popular-location.module.js.map