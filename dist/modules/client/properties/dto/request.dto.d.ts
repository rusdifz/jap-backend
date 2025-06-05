import { LocationEnum, PaginationDTO, PropertyStatusEnum, PropertyTypeEnum } from 'src/common';
export declare class PropertiesDTO extends PaginationDTO {
    location?: LocationEnum | string;
    property_type?: PropertyTypeEnum;
    property_status?: PropertyStatusEnum;
    amenities?: string[];
    search_keyword?: string;
    id_except: number;
}
export declare class PropertyDetailDTO {
    property_id?: number;
    slug?: string;
}
