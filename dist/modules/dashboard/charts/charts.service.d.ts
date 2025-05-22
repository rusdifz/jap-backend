import { DashboardMasterLocationService } from '../master-location/master-location.service';
import { DashboardPropertiesService } from '../properties/services/properties.service';
import { PropertiesDB } from 'src/common';
export declare class ChartsService {
    private readonly masterLocationService;
    private readonly propertiesService;
    constructor(masterLocationService: DashboardMasterLocationService, propertiesService: DashboardPropertiesService);
    chartPropertyHasBeenUpdatedOneMonth(): Promise<{
        charts: any[];
    }>;
    pieChart(): Promise<{
        chart: {
            olderOneMonth: number;
            lastUpdate: number;
        };
    }>;
    chartStatisticProperty(): Promise<{
        charts: any[];
    }>;
    tabelProperty(): Promise<PropertiesDB[]>;
}
