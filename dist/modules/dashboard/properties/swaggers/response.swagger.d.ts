import { Meta, MetaUpsert, Pagination } from 'src/common';
import { ReqCreatePropertyDTO } from '../dto/request.dto';
import { ResProperty } from '../dto/response.dto';
export declare class SwgListOffice {
    meta: Meta;
    data: ResProperty[];
    pagination: Pagination;
}
export declare class SwgDetailProperty {
    meta: Meta;
    data: ResProperty;
}
export declare class SwgCreateProperty {
    meta: MetaUpsert;
    data: ReqCreatePropertyDTO;
}
