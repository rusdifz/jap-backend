import { PropertyStatusEnum, LocationEnum, StatusPublishEnum } from '../enums';
import { Unit } from './units.interface';
import { IMedia } from './media.interface';
export interface PropertyAbstract {
    property_id: number;
    popular: number;
    name: string;
    slug: string;
    description: string;
    status_publish: StatusPublishEnum;
    property_status: PropertyStatusEnum;
    total_unit: number;
    phone_deposit: string;
    booking_deposit: string;
    security_deposit: string;
    price_overtime_electricity: string;
    price_overtime_lighting: string;
    price_overtime_ac: string;
    price_ground_floor: number;
    price_rent_average: number;
    parking_charge_reserved_car: string;
    parking_charge_reserved_motorcycle: string;
    parking_charge_unreserved_car: string;
    parking_charge_unreserved_motorcycle: string;
    completion: string;
    amenities: string[];
    property_type: string[];
    property_size: number;
    office_hours_weekday: string;
    office_hours_weekend: string;
    total_floor: number;
    size_floor: string;
    provider_internet: string;
    minimum_lease_term: string;
    payment_term: string;
    telecommunication_isp: boolean;
    telecommunication_fiber_optic: boolean;
    telecommunication_wifi: boolean;
    fire_safety_sprinkle: boolean;
    fire_safety_heat_detector: boolean;
    fire_safety_smoke_detector: boolean;
    other_info_loading_capacity: string;
    other_info_ac_system: string;
    other_info_ac_zoning: string;
    other_info_electricity: string;
    other_info_power_unit: string;
    address: string;
    location: LocationEnum;
    koordinat_map: string;
    nearby_bus_station: string;
    nearby_hospital: string;
    nearby_police: string;
    nearby_mall: string;
    url_youtube?: string;
    thumbnail: string;
    units?: Unit[];
    images?: IMedia[];
    ac_info: string;
    electricity_info: string;
    lighting_info: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    created_by?: string;
    updated_by?: string;
    deleted_by?: string;
}
export interface IProperty {
    property_id: number;
    property_status: PropertyStatusEnum;
    popular: number;
    name: string;
    slug: string;
    description: string;
    status_publish?: StatusPublishEnum;
    address: string;
    location: LocationEnum;
    koordinat_map: string;
    property_type: string[];
    price: {
        phone_deposit?: string;
        booking_deposit?: string;
        security_deposit?: string;
        overtime?: {
            electricity: string;
            lighting: string;
            ac: string;
        };
        ground_floor?: number;
        rent_average: number;
        parking_charge?: {
            reserved: {
                car: string;
                motorcycle: string;
            };
            unreserved: {
                car: string;
                motorcycle: string;
            };
        };
    };
    completion: string;
    amenities: string[];
    spesification: {
        property_size: number;
        office_hours_weekday?: string;
        office_hours_weekend?: string;
        total_floor?: number;
        size_floor?: string;
        provider_internet?: string;
    };
    nearby: {
        bus_station: string;
        hospital: string;
        police: string;
        mall: string;
    };
    telecommunication: {
        isp: boolean;
        fiber_optic: boolean;
        wifi: boolean;
    };
    fire_safety: {
        sprinkle: boolean;
        heat_detector: boolean;
        smoke_detector: boolean;
    };
    terms: {
        minium_lease: string;
        payment: string;
    };
    other_info: {
        loading_capacity: string;
        ac_system: string;
        ac_zoning: string;
        electricity: string;
        power_unit: string;
    };
    thumbnail: string;
    url_youtube?: string;
    property_feature?: any[];
    units: Unit[];
    images: IMedia[];
    ac_info: string;
    electricity_info: string;
    lighting_info: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    created_by?: string;
    updated_by?: string;
    deleted_by?: string;
}
