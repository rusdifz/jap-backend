import { IJwtUser, PaginationDTO } from 'src/common';
import { ReqCreateMasterLocationDTO, ReqUpdateMasterLocationDTO } from './dto/request.dto';
import { ResMasterLocation } from './dto/response.dto';
import { DashboardMasterLocationsRepository } from './master-location.repository';
export declare class DashboardMasterLocationService {
    private repository;
    constructor(repository: DashboardMasterLocationsRepository);
    create(data: ReqCreateMasterLocationDTO, admin: IJwtUser): Promise<ReqCreateMasterLocationDTO>;
    update(data: ReqUpdateMasterLocationDTO, admin: IJwtUser): Promise<ReqUpdateMasterLocationDTO>;
    delete(id: number, admin: IJwtUser): Promise<Object>;
    getDetail(id: number): Promise<ResMasterLocation>;
    getList(props: PaginationDTO): Promise<{
        data: ResMasterLocation[];
        count: number;
    }>;
    updateImage(id: number, url_image: string): Promise<import("typeorm").UpdateResult>;
    getListPosition(): Promise<void>;
}
