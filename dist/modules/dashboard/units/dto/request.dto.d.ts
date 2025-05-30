import { ConditionUnitEnum, PaginationDTO, PropertyStatusEnum, Unit } from 'src/common';
export declare class ReqCreateUnitDTO implements Partial<Unit> {
    property_id: number;
    size: string;
    floor: string;
    condition: ConditionUnitEnum;
    available: boolean;
    rent_sqm: number;
    status: PropertyStatusEnum;
    pic_name?: string;
    pic_phone?: string;
}
export declare class ReqUpdateUnitDTO extends ReqCreateUnitDTO {
    unit_id: string;
}
export declare class UnitListDTO extends PaginationDTO {
    property_id: string;
    status: string;
}
