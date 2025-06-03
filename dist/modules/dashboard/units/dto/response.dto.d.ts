import { ConditionUnitEnum, PropertyStatusEnum, Unit } from 'src/common';
export declare class ResUnit implements Partial<Unit> {
    unit_id: string;
    property_id: number;
    size: string;
    floor: string;
    condition: ConditionUnitEnum;
    available: boolean;
    rent_price: number;
    service_charge_info?: string;
    service_charge_price?: number;
    status: PropertyStatusEnum;
    created_at: Date;
    updated_at: Date;
}
