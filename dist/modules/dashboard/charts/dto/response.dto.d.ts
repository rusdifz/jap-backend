import { PropertiesDB } from 'src/common';
declare class CommonCharts {
    location: string;
    count: number;
}
declare class UnitCharts {
    status: string;
    count: number;
}
export declare class ResDashboardHomeDTO {
    charts: {
        hasBeenUpdated: CommonCharts[];
        pieCharts: {
            statisctisUpdated: {
                olderOneMonth: number;
                lastUpdate: number;
            };
            units: UnitCharts[];
            luasan: {
                a: CommonCharts[];
                b: CommonCharts[];
                c: CommonCharts[];
                d: CommonCharts[];
                e: CommonCharts[];
            };
        };
        jumlahProperty: CommonCharts[];
    };
    tabels: Partial<PropertiesDB>[];
}
export {};
