import { ConditionUnitEnum, PropertyStatusEnum } from '../enums';
export interface Unit {
    unit_id?: string;
    property_id: number;
    size: string;
    floor: string;
    condition: ConditionUnitEnum;
    available: boolean;
    status: PropertyStatusEnum;
    rent_price: number;
    service_charge_price: number;
    service_charge_info: string;
    pic_name: string;
    pic_phone: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    created_by?: string;
    updated_by?: string;
    deleted_by?: string;
}
