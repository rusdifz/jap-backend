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
  url_youtube?: string;
  description: string;
  address: string;
  location: LocationEnum;
  koordinat_map: string;
  property_type: string[];
  property_status: PropertyStatusEnum;
  price: {
    phone_deposit: string;
    booking_deposit: string;
    security_deposit: string;
    rent_average: number;
    overtime: {
      electricity: string;
      lighting: string;
      ac: string;
    };
    ground_floor: number;
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
  };
  nearby: {
    bus_station: string;
    hospital: string;
    police: string;
    mall: string;
  };
  property_feature?: any[];
  units: Unit[];
  thumbnail: string;
  images: IMedia[];
  created_at?: string;
  updated_at?: string;
}

export class ResProperties implements Partial<IProperty> {
  property_id: number;
  name: string;
  slug: string;
  location?: LocationEnum;
  property_type?: string[];
  price: {
    rent_average: number;
  };
  spesification?: {
    property_size: number;
  };
  thumbnail: string;
  units?: Unit[];
  // images?: IMedia[];
  created_at?: string;
  updated_at?: string;
}
