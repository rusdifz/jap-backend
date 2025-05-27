import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { IJwtUser, PropertiesDB } from 'src/common';
import { PropertiesDTO, ReqCreatePropertyPicDTO, ReqGetPicListDTO, ReqUpdatePropertyPicDTO } from '../dto/request.dto';
import { ReqCreatePropertyDTO, ReqUpdatePropertyDTO } from '../dto/request.dto';
import { ResProperty } from '../dto/response.dto';
import { DashboardUnitsService } from '../../units/units.service';
import { DashboardPropertiesRepository } from '../properties.repository';
import { DashboardImagesService } from '../../images/images.service';
export declare class DashboardPropertiesService {
    private readonly repository;
    private readonly unitService;
    private readonly imageService;
    constructor(repository: DashboardPropertiesRepository, unitService: DashboardUnitsService, imageService: DashboardImagesService);
    get(property_id: number | string): Promise<any>;
    getList(props: PropertiesDTO): Promise<{
        data: ResProperty[];
        count: number;
    }>;
    getListCustom(queryOptions: FindManyOptions<PropertiesDB>): Promise<PropertiesDB[]>;
    CountData(queryWhere: FindOptionsWhere<PropertiesDB>): Promise<number>;
    CountDataJoinTable(queryWhere: FindOptionsWhere<PropertiesDB>): Promise<number>;
    create(body: ReqCreatePropertyDTO, admin: IJwtUser): Promise<ReqCreatePropertyDTO>;
    update(body: ReqUpdatePropertyDTO, admin: IJwtUser): Promise<ReqUpdatePropertyDTO>;
    delete(property_id: number, admin: IJwtUser): Promise<Object>;
    getListPic(props: ReqGetPicListDTO): Promise<{
        data: any[];
        count: number;
    }>;
    createPic(body: ReqCreatePropertyPicDTO, admin: IJwtUser): Promise<ReqCreatePropertyPicDTO>;
    updatePic(body: ReqUpdatePropertyPicDTO, admin: IJwtUser): Promise<ReqUpdatePropertyPicDTO>;
    deletePic(pic_id: string, admin: IJwtUser): Promise<Object>;
    updateTotalUnit(property_id: number): Promise<number>;
    decreaseTotalUnit(unit_id: string): Promise<number>;
    checkForStaleDataOlderThanOneMonth(): Promise<any[]>;
    inputBulkFromExcel(): Promise<any[]>;
}
