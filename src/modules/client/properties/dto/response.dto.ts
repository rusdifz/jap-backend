import {
  LocationEnum,
  IMedia,
  IProperty,
  Unit,
  PropertyStatusEnum,
  PropertyTypeEnum,
} from 'src/common';

export class ResProperty implements Partial<IProperty> {
  property_id: number;
  name: string;
  slug: string;
  description: string;
  address: string;
  location: LocationEnum;
  koordinat_map: string;
  property_type: PropertyTypeEnum;
  property_status: PropertyStatusEnum;
  price: {
    phone_deposit: string;
    booking_deposit: string;
    security_deposit: string;
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
  };
  nearby: {
    bus_station: string;
    hospital: string;
    police: string;
    mall: string;
  };
  property_feature?: any[];
  units: Unit[];
  images: IMedia[];
  created_at?: string;
  updated_at?: string;
}

export class ResProperties implements Partial<IProperty> {
  property_id: number;
  name: string;
  slug: string;
  location?: LocationEnum;
  property_type?: PropertyTypeEnum;
  price: {
    rent_sqm: number;
  };
  spesification?: {
    property_size: number;
  };
  images?: IMedia[];
  created_at?: string;
  updated_at?: string;
}
