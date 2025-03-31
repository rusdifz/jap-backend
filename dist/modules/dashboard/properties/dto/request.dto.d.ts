import { IProperty, StatusPublishEnum, LocationEnum, PropertyTypeEnum, PaginationDTO, PropertyStatusEnum } from 'src/common';
declare class OvertimePrice {
    electricity: string;
    lighting: string;
    ac: string;
}
declare class ParkingChargeDetail {
    car: string;
    motorcycle: string;
}
declare class ParkingCharge {
    reserved: ParkingChargeDetail;
    unreserved: ParkingChargeDetail;
}
declare class Price {
    phone_deposit: string;
    overtime: OvertimePrice;
    ground_floor_sqm: number;
    rent_sqm: number;
    service_charge: {
        price: number;
        info: string;
    };
    parking_charge: ParkingCharge;
}
declare class Spesification {
    property_size: number;
    office_hours_weekday: string;
    office_hours_weekend: string;
    total_floor: number;
    size_floor: number;
    provider_internet: string;
}
declare class Nearby {
    bus_station: string;
    hospital: string;
    police: string;
    mall: string;
}
export declare class ReqCreatePropertyDTO implements Partial<IProperty> {
    name: string;
    popular: number;
    description: string;
    address: string;
    location: LocationEnum;
    koordinat_map: string;
    status_publish: StatusPublishEnum;
    property_type: PropertyTypeEnum;
    completion: string;
    amenities: string[];
    price: Price;
    spesification: Spesification;
    nearby: Nearby;
}
declare const ReqUpdatePropertyDTO_base: import("@nestjs/common").Type<Partial<ReqCreatePropertyDTO>>;
export declare class ReqUpdatePropertyDTO extends ReqUpdatePropertyDTO_base {
    property_id: number;
}
export declare class PropertiesDTO extends PaginationDTO {
    location?: LocationEnum;
    property_type?: PropertyTypeEnum;
    property_status?: PropertyStatusEnum;
    amenities?: string[];
    search_keyword?: string;
}
export declare class PropertyDetailDTO {
    property_id?: number;
    slug?: string;
}
export declare class GeneratePDFDTO {
    property_id: string[];
}
export {};
