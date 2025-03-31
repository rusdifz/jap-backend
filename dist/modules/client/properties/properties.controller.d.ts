import { PropertiesDTO } from './dto/request.dto';
import { ClientPropertiesService } from './properties.service';
export declare class ClientPropertiesController {
    private readonly service;
    constructor(service: ClientPropertiesService);
    getDetail(slug: string): Promise<import("./dto/response.dto").ResProperty>;
    getList(query: PropertiesDTO): Promise<{
        data: import("./dto/response.dto").ResProperties[];
        count: number;
    }>;
}
