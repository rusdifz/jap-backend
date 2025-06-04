import { IProperty, LocationEnum, StatusPublishEnum, IMedia, Unit, PropertyStatusEnum } from 'src/common';
export declare class ResProperty implements Partial<IProperty> {
    property_id: number;
    popular: number;
    property_status: PropertyStatusEnum;
    name: string;
    thumbnail?: string;
    url_youtube?: string;
    slug: string;
    description: string;
    address: string;
    location: LocationEnum;
    koordinat_map: string;
    status_publish: StatusPublishEnum;
    property_type: string[];
    price: {
        phone_deposit: string;
        booking_deposit: string;
        security_deposit: string;
        overtime: {
            electricity: string;
            lighting: string;
            ac: string;
        };
        ground_floor: number;
        rent_average: number;
        parking_charge: {
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
        office_hours_weekday: string;
        office_hours_weekend: string;
        total_floor: number;
        size_floor: string;
        provider_internet: string;
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
    units: Unit[];
    images: IMedia[];
    created_at?: string;
    updated_at?: string;
    ac_info: string;
    electricity_info: string;
    lighting_info: string;
}
