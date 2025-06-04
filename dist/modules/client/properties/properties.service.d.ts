import { PropertiesDTO } from './dto/request.dto';
import { ResProperties, ResProperty } from './dto/response.dto';
import { ClientPropertiesRepository } from './properties.repository';
export declare class ClientPropertiesService {
    private readonly repository;
    constructor(repository: ClientPropertiesRepository);
    getDetail(slug: string): Promise<ResProperty>;
    getList(props: PropertiesDTO): Promise<{
        data: ResProperties[];
        count: number;
    }>;
}
