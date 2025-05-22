import { ChartsService } from './charts.service';
export declare class ChartsController {
    private readonly service;
    constructor(service: ChartsService);
    getChartHasBeenUpdatedOneMonth(): Promise<{
        charts: any[];
    }>;
    getPieChart(): Promise<{
        chart: {
            olderOneMonth: number;
            lastUpdate: number;
        };
    }>;
    getChartStatistic(): Promise<{
        charts: any[];
    }>;
    getTabelLastUpdated(): Promise<import("../../../common").PropertiesDB[]>;
}
