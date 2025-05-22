import { ConditionUnitEnum, PropertyStatusEnum } from '../enums';
export interface Unit {
    unit_id: string;
    property_id: number;
    size: number;
    floor: string;
    condition: ConditionUnitEnum;
    available: boolean;
    rent_sqm: number;
    status: PropertyStatusEnum;
    pic_name: string;
    pic_phone: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    created_by?: string;
    updated_by?: string;
    deleted_by?: string;
}
