import { ConditionUnitEnum, PropertyStatusEnum } from '../enums';
import { PropertiesDB } from './property.entity';
import { Unit } from '../interfaces/units.interface';
export declare class UnitsDB implements Unit {
    unit_id: string;
    property_id: number;
    status: PropertyStatusEnum;
    floor: string;
    size: string;
    condition: ConditionUnitEnum;
    available: boolean;
    rent_price: number;
    service_charge_price: number;
    service_charge_info: string;
    pic_name: string;
    pic_phone: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    created_by: string;
    updated_by: string;
    deleted_by: string;
    property?: PropertiesDB;
}
