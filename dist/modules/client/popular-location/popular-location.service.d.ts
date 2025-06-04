import { PopularLocationsRepository } from './popular-location.repository';
import { ResLocation } from './dto/response.dto';
export declare class PopularLocationService {
    private repository;
    constructor(repository: PopularLocationsRepository);
    getList(): Promise<{
        data: ResLocation[];
        count: number;
    }>;
}
