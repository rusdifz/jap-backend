import { FindManyOptions } from 'typeorm';
import { IJwtUser, UnitsDB } from 'src/common';
import { UnitListDTO } from './dto/request.dto';
import { ResUnit } from './dto/response.dto';
import { ReqCreateUnitDTO, ReqUpdateUnitDTO } from './dto/request.dto';
import { DashboardUnitsRepository } from './units.repository';
export declare class DashboardUnitsService {
    private readonly repository;
    constructor(repository: DashboardUnitsRepository);
    getDetail(unit_id: string): Promise<ResUnit>;
    getList(props: UnitListDTO): Promise<{
        data: ResUnit[];
        count: number;
    }>;
    create(body: ReqCreateUnitDTO, admin: IJwtUser): Promise<ReqCreateUnitDTO>;
    update(body: ReqUpdateUnitDTO, admin: IJwtUser): Promise<any>;
    delete(unit_id: string, admin: IJwtUser): Promise<Object>;
    updateTotalUnit(property_id: number): Promise<number>;
    decreaseTotalUnit(unit_id: string): Promise<number>;
    getDeleteData(unit_id: string): Promise<UnitsDB>;
    countUnitByPropertyId(property_id: number): Promise<number>;
    findCustomOptions(options: FindManyOptions<UnitsDB>): Promise<UnitsDB[]>;
}
