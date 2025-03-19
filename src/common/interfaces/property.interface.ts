import {
  PropertyStatusEnum,
  PropertyTypeEnum,
  LocationEnum,
  StatusPublishEnum,
} from '../enums';
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

  //price explain
  phone_deposit: string;
  price_overtime_electricity: string;
  price_overtime_lighting: string;
  price_overtime_ac: string;
  price_ground_floor_sqm: number;
  price_rent_sqm: number;
  service_charge: number;
  service_charge_info: string;
  parking_charge_reserved_car: string;
  parking_charge_reserved_motorcycle: string;
  parking_charge_unreserved_car: string;
  parking_charge_unreserved_motorcycle: string;

  //spesification building
  completion: string;
  amenities: string[];
  property_type: PropertyTypeEnum;
  property_size: number;
  office_hours_weekday: string;
  office_hours_weekend: string;
  total_floor: number;
  size_floor: number;
  provider_internet: string;

  ///adress detail
  address: string;
  location: LocationEnum;
  koordinat_map: string;
  nearby_bus_station: string;
  nearby_hospital: string;
  nearby_police: string;
  nearby_mall: string;

  //join table
  units?: Unit[];
  images?: IMedia[];

  //etc
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
    office_hours_weekday?: string;
    office_hours_weekend?: string;
    total_floor?: number;
    size_floor?: number;
    provider_internet?: string;
  };
  nearby: {
    bus_station: string;
    hospital: string;
    police: string;
    mall: string;
  };
  property_feature?: any[];
  //join table
  units: Unit[];
  images: IMedia[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  created_by?: string;
  updated_by?: string;
  deleted_by?: string;
}
