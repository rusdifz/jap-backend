import { ChartsService } from './charts.service';
export declare class ChartsController {
    private readonly service;
    constructor(service: ChartsService);
    getChartHasBeenUpdatedOneMonth(): Promise<{
        charts: any[];
    }>;
    getChartStatistic(): Promise<{
        charts: any[];
    }>;
    getTabelLastUpdated(): Promise<import("../../../common").PropertiesDB[]>;
    getHomeDashboard(): Promise<import("./dto/response.dto").ResDashboardHomeDTO>;
}
