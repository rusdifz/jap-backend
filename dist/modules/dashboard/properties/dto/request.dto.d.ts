import { IProperty, StatusPublishEnum, LocationEnum, PropertyTypeEnum, PaginationDTO, PropertyStatusEnum, ConditionUnitEnum } from 'src/common';
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
    booking_deposit: string;
    security_deposit: string;
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
declare class Terms {
    minium_lease: string;
    payment: string;
}
declare class Telecommunication {
    isp: boolean;
    fiber_optic: boolean;
    wifi: boolean;
}
declare class FireSafety {
    sprinkle: boolean;
    heat_detector: boolean;
    smoke_detector: boolean;
}
declare class OtherInfo {
    loading_capacity: string;
    ac_system: string;
    ac_zoning: string;
    electricity: string;
    power_unit: string;
}
export declare class ReqCreatePropertyDTO implements Partial<IProperty> {
    name: string;
    popular: number;
    description: string;
    address: string;
    location: LocationEnum;
    koordinat_map: string;
    status_publish: StatusPublishEnum;
    property_status?: PropertyStatusEnum;
    property_type: string[];
    completion: string;
    url_youtube: string;
    amenities: string[];
    price: Price;
    spesification: Spesification;
    nearby: Nearby;
    terms: Terms;
    telecommunication: Telecommunication;
    fire_safety: FireSafety;
    other_info: OtherInfo;
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
    condition?: ConditionUnitEnum;
    unit_size?: number;
    min_rent_sqm?: number;
    max_rent_sqm?: number;
}
export declare class PropertyDetailDTO {
    property_id?: number;
    slug?: string;
}
export declare class GeneratePDFDTO {
    property_id: number[];
}
export declare class PdfComparisonDTO {
    location: string;
    unit_id: string[];
}
export declare class PdfDetailDTO {
    location: string;
    properties_download: {
        property_id: number;
        unit_id: string[];
    }[];
}
export {};
