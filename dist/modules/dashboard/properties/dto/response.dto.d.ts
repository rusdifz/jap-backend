import { IProperty, LocationEnum, StatusPublishEnum, IMedia, Unit, PropertyStatusEnum, PropertyTypeEnum } from 'src/common';
export declare class ResProperty implements IProperty {
    property_id: number;
    popular: number;
    property_status: PropertyStatusEnum;
    name: string;
    slug: string;
    description: string;
    address: string;
    location: LocationEnum;
    koordinat_map: string;
    status_publish: StatusPublishEnum;
    property_type: PropertyTypeEnum;
    price: {
        phone_deposit: string;
        overtime: {
            electricity: string;
            lighting: string;
            ac: string;
        };
        ground_floor_sqm: number;
        rent_sqm: number;
        service_charge: {
            price: number;
            info: string;
        };
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
        size_floor: number;
        provider_internet: string;
    };
    nearby: {
        bus_station: string;
        hospital: string;
        police: string;
        mall: string;
    };
    units: Unit[];
    images: IMedia[];
    created_at?: string;
    updated_at?: string;
}
