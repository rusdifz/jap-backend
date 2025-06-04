import { PopularLocationService } from './popular-location.service';
export declare class PopularLocationController {
    private readonly service;
    constructor(service: PopularLocationService);
    getList(): Promise<{
        data: import("./dto/response.dto").ResLocation[];
        count: number;
    }>;
}
