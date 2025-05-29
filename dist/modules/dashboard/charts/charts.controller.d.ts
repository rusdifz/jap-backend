import { ChartsService } from './charts.service';
export declare class ChartsController {
    private readonly service;
    constructor(service: ChartsService);
    getHomeDashboard(): Promise<any>;
}
