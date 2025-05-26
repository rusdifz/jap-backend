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
exports.ChartsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const common_2 = require("../../../common");
const master_location_service_1 = require("../master-location/master-location.service");
const properties_service_1 = require("../properties/services/properties.service");
const units_service_1 = require("../units/units.service");
let ChartsService = class ChartsService {
    constructor(masterLocationService, propertiesService, unitsService) {
        this.masterLocationService = masterLocationService;
        this.propertiesService = propertiesService;
        this.unitsService = unitsService;
    }
    async chartPropertyHasBeenUpdatedOneMonth() {
        const locations = await this.masterLocationService.getList({
            page: 1,
            limit: 100,
        });
        const charts = [];
        for (const location of locations.data) {
            const countData = await this.propertiesService.CountData({
                location: location.location_name,
                updated_at: (0, typeorm_1.MoreThanOrEqual)(common_2.monthAgo),
            });
            charts.push({
                location: location.location_name,
                count: countData,
            });
        }
        return { charts };
    }
    async chartStatisticProperty() {
        const [locations, properties] = await Promise.all([
            this.masterLocationService.getList({ page: 1, limit: 500 }),
            this.propertiesService.getList({ page: 1, limit: 1000 }),
        ]);
        const charts = [];
        locations.data.forEach((location) => {
            const dataChart = {
                location: location.location_name,
                count: 0,
            };
            properties.data.forEach((property) => {
                if (property.location === location.location_name) {
                    dataChart.count += 1;
                }
            });
            charts.push(dataChart);
        });
        return { charts: charts };
    }
    async tabelProperty() {
        const optionQuery = {
            select: {
                property_id: true,
                name: true,
                location: true,
                updated_at: true,
            },
            order: {
                updated_at: 'desc',
            },
            take: 6,
        };
        let findData = await this.propertiesService.getListCustom(optionQuery);
        if (findData.length > 0) {
            findData = findData.map((dt) => {
                dt.updated_at = (0, common_2.dayjs)(dt.updated_at).format('MMMM D, YYYY');
                return dt;
            });
        }
        return findData;
    }
    async countSumPropertyBySize(unit_size) {
        const locations = await this.masterLocationService.getList({
            page: 1,
            limit: 500,
        });
        let sizeQuery = {};
        if (unit_size === 99) {
            sizeQuery = { size: (0, typeorm_1.LessThanOrEqual)(100) };
        }
        else if (unit_size === 100) {
            sizeQuery = { size: (0, typeorm_1.Between)(unit_size, 200) };
        }
        else if (unit_size === 200) {
            sizeQuery = { size: (0, typeorm_1.Between)(unit_size, 500) };
        }
        else if (unit_size === 500) {
            sizeQuery = { size: (0, typeorm_1.Between)(unit_size, 1000) };
        }
        else {
            sizeQuery = { size: (0, typeorm_1.MoreThanOrEqual)(unit_size) };
        }
        const charts = [];
        locations.data.forEach(async (loc) => {
            const countData = await this.propertiesService.CountDataJoinTable({
                units: sizeQuery,
            });
            charts.push({
                location: loc,
                count: countData,
            });
        });
        return charts;
    }
    async homeDashboard() {
        const [hasBeenUpdated, listPropertyLastUpdated, statisticProperty, propertiesOlderOneMonth, propertiesLastUpdate, countUnitsFurnished, countUnitsBare, countUnitsPartition, sumSizeA, sumSizeB, sumSizeC, sumSizeD, sumSizeE,] = await Promise.all([
            this.chartPropertyHasBeenUpdatedOneMonth(),
            this.tabelProperty(),
            this.chartStatisticProperty(),
            this.propertiesService.CountData({
                updated_at: (0, typeorm_1.LessThanOrEqual)(common_2.monthAgo),
            }),
            this.propertiesService.CountData({
                updated_at: (0, typeorm_1.MoreThanOrEqual)(common_2.monthAgo),
            }),
            this.unitsService.countData({ condition: common_2.ConditionUnitEnum.FURNISHED }),
            this.unitsService.countData({ condition: common_2.ConditionUnitEnum.BARE }),
            this.unitsService.countData({ condition: common_2.ConditionUnitEnum.PARTITION }),
            this.countSumPropertyBySize(99),
            this.countSumPropertyBySize(100),
            this.countSumPropertyBySize(200),
            this.countSumPropertyBySize(500),
            this.countSumPropertyBySize(1000),
        ]);
        return {
            charts: {
                hasBeenUpdated: hasBeenUpdated.charts,
                pieCharts: {
                    statisctisUpdated: {
                        olderOneMonth: propertiesOlderOneMonth,
                        lastUpdate: propertiesLastUpdate,
                    },
                    units: [
                        {
                            status: common_2.ConditionUnitEnum.FURNISHED,
                            count: countUnitsFurnished,
                        },
                        {
                            status: common_2.ConditionUnitEnum.BARE,
                            count: countUnitsBare,
                        },
                        {
                            status: common_2.ConditionUnitEnum.PARTITION,
                            count: countUnitsPartition,
                        },
                    ],
                    luasan: {
                        a: sumSizeA,
                        b: sumSizeB,
                        c: sumSizeC,
                        d: sumSizeD,
                        e: sumSizeE,
                    },
                },
                jumlahProperty: statisticProperty.charts,
            },
            tabels: listPropertyLastUpdated,
        };
    }
};
exports.ChartsService = ChartsService;
exports.ChartsService = ChartsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [master_location_service_1.DashboardMasterLocationService,
        properties_service_1.DashboardPropertiesService,
        units_service_1.DashboardUnitsService])
], ChartsService);
//# sourceMappingURL=charts.service.js.map