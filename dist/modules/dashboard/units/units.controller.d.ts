import { IJwtUser } from 'src/common';
import { DashboardUnitsService } from './units.service';
import { ReqCreateUnitDTO, ReqUpdateUnitDTO, UnitListDTO } from './dto/request.dto';
export declare class DashboardUnitsController {
    private readonly service;
    constructor(service: DashboardUnitsService);
    getDetail(id: string): Promise<import("./dto/response.dto").ResUnit>;
    getList(query: UnitListDTO): Promise<{
        data: import("./dto/response.dto").ResUnit[];
        count: number;
    }>;
    create(user: IJwtUser, body: ReqCreateUnitDTO): Promise<ReqCreateUnitDTO>;
    update(user: IJwtUser, body: ReqUpdateUnitDTO): Promise<any>;
    deleteOne(user: IJwtUser, id: string): Promise<Object>;
}
