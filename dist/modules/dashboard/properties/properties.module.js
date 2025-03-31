"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardPropertiesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const properties_repository_1 = require("./properties.repository");
const properties_service_1 = require("./properties.service");
const properties_controller_1 = require("./properties.controller");
const units_module_1 = require("../units/units.module");
const common_2 = require("../../../common");
let DashboardPropertiesModule = class DashboardPropertiesModule {
};
exports.DashboardPropertiesModule = DashboardPropertiesModule;
exports.DashboardPropertiesModule = DashboardPropertiesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([common_2.PropertiesDB]), units_module_1.DashboardUnitsModule],
        providers: [properties_repository_1.DashboardPropertiesRepository, properties_service_1.DashboardPropertiesService],
        controllers: [properties_controller_1.DashboardPropertiesController],
        exports: [properties_service_1.DashboardPropertiesService],
    })
], DashboardPropertiesModule);
//# sourceMappingURL=properties.module.js.map