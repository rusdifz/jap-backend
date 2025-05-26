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
exports.ChartsController = void 0;
const common_1 = require("@nestjs/common");
const charts_service_1 = require("./charts.service");
let ChartsController = class ChartsController {
    constructor(service) {
        this.service = service;
    }
    async getChartHasBeenUpdatedOneMonth() {
        return await this.service.chartPropertyHasBeenUpdatedOneMonth();
    }
    async getChartStatistic() {
        return await this.service.chartStatisticProperty();
    }
    async getTabelLastUpdated() {
        return await this.service.tabelProperty();
    }
    async getHomeDashboard() {
        return await this.service.homeDashboard();
    }
};
exports.ChartsController = ChartsController;
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('/has-been-updated-one-month'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChartsController.prototype, "getChartHasBeenUpdatedOneMonth", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('/statistic'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChartsController.prototype, "getChartStatistic", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('/table'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChartsController.prototype, "getTabelLastUpdated", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)('/home'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChartsController.prototype, "getHomeDashboard", null);
exports.ChartsController = ChartsController = __decorate([
    (0, common_1.Controller)('dashboard/charts'),
    __metadata("design:paramtypes", [charts_service_1.ChartsService])
], ChartsController);
//# sourceMappingURL=charts.controller.js.map