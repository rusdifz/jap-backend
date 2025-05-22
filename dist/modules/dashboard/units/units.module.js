"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardUnitsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_2 = require("../../../common");
const units_service_1 = require("./units.service");
const units_controller_1 = require("./units.controller");
const units_repository_1 = require("./units.repository");
let DashboardUnitsModule = class DashboardUnitsModule {
};
exports.DashboardUnitsModule = DashboardUnitsModule;
exports.DashboardUnitsModule = DashboardUnitsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([common_2.UnitsDB, common_2.PropertiesDB])],
        providers: [units_service_1.DashboardUnitsService, units_repository_1.DashboardUnitsRepository],
        controllers: [units_controller_1.DashboardUnitsController],
        exports: [units_service_1.DashboardUnitsService],
    })
], DashboardUnitsModule);
//# sourceMappingURL=units.module.js.map