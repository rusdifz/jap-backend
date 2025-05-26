import { PropertiesDB } from 'src/common';
import { DashboardMasterLocationService } from '../master-location/master-location.service';
import { DashboardPropertiesService } from '../properties/services/properties.service';
import { DashboardUnitsService } from '../units/units.service';
export declare class ChartsService {
    private readonly masterLocationService;
    private readonly propertiesService;
    private readonly unitsService;
    constructor(masterLocationService: DashboardMasterLocationService, propertiesService: DashboardPropertiesService, unitsService: DashboardUnitsService);
    chartPropertyHasBeenUpdatedOneMonth(): Promise<{
        charts: any[];
    }>;
    chartStatisticProperty(): Promise<{
        charts: any[];
    }>;
    tabelProperty(): Promise<PropertiesDB[]>;
    countSumPropertyBySize(unit_size: number): Promise<any[]>;
    homeDashboard(): Promise<any>;
}
