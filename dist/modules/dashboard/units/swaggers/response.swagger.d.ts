import { Meta, MetaUpsert, Pagination } from 'src/common';
import { ResUnit } from '../dto/response.dto';
import { ReqCreateUnitDTO, ReqUpdateUnitDTO } from '../dto/request.dto';
export declare class SwgListunit {
    meta: Meta;
    data: ResUnit[];
    pagination: Pagination;
}
export declare class SwgDetailUnit {
    meta: Meta;
    data: ResUnit;
}
export declare class SwgCreateUnit {
    meta: MetaUpsert;
    data: ReqCreateUnitDTO;
}
export declare class SwgUpdateUnit {
    meta: MetaUpsert;
    data: ReqUpdateUnitDTO;
}
