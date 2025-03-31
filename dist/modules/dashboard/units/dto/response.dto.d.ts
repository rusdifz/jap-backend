import { ConditionUnitEnum, PropertyStatusEnum, Unit } from 'src/common';
export declare class ResUnit implements Partial<Unit> {
    unit_id: string;
    property_id: number;
    size: number;
    floor: string;
    condition: ConditionUnitEnum;
    available: boolean;
    rent_sqm: number;
    status: PropertyStatusEnum;
    created_at: Date;
    updated_at: Date;
}
