import { IJwtUser } from 'src/common';
import { PropertiesDTO } from '../dto/request.dto';
import { ReqCreatePropertyDTO, ReqUpdatePropertyDTO } from '../dto/request.dto';
import { ResProperty } from '../dto/response.dto';
import { DashboardUnitsService } from '../../units/units.service';
import { DashboardPropertiesRepository } from '../properties.repository';
export declare class DashboardPropertiesService {
    private readonly repository;
    private readonly unitService;
    constructor(repository: DashboardPropertiesRepository, unitService: DashboardUnitsService);
    get(property_id: number | string): Promise<any>;
    getList(props: PropertiesDTO): Promise<{
        data: ResProperty[];
        count: number;
    }>;
    create(body: ReqCreatePropertyDTO, admin: IJwtUser): Promise<ReqCreatePropertyDTO>;
    update(body: ReqUpdatePropertyDTO, admin: IJwtUser): Promise<ReqUpdatePropertyDTO>;
    delete(property_id: number, admin: IJwtUser): Promise<Object>;
    updateTotalUnit(property_id: number): Promise<number>;
    decreaseTotalUnit(unit_id: string): Promise<number>;
    checkForStaleDataOlderThanOneMonth(): Promise<any[]>;
    inputBulkFromExcel(): Promise<any[]>;
}
