import { IJwtUser, PaginationDTO } from 'src/common';
import { DashboardMasterLocationService } from './master-location.service';
import { ReqCreateMasterLocationDTO, ReqUpdateMasterLocationDTO } from './dto/request.dto';
export declare class DashboardMasterLocationController {
    private readonly service;
    constructor(service: DashboardMasterLocationService);
    create(user: IJwtUser, body: ReqCreateMasterLocationDTO): Promise<ReqCreateMasterLocationDTO>;
    update(user: IJwtUser, bodyparam: ReqUpdateMasterLocationDTO): Promise<ReqUpdateMasterLocationDTO>;
    deleteOne(id: number, user: IJwtUser): Promise<Object>;
    getDetail(id: number): Promise<import("./dto/response.dto").ResMasterLocation>;
    getList(query: PaginationDTO): Promise<{
        data: import("./dto/response.dto").ResMasterLocation[];
        count: number;
    }>;
}
