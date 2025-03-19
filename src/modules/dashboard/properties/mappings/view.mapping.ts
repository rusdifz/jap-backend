import { dayjs, PropertiesDB } from 'src/common';
import { ResProperty } from '../dto/response.dto';

export async function mapDbToResDetail(db: PropertiesDB): Promise<ResProperty> {
  return {
    property_id: db.property_id,
    property_status: db.property_status,
    popular: db.popular,
    name: db.name,
    slug: db.slug,
    description: db.description,
    address: db.address,
    location: db.location,
    koordinat_map: db.koordinat_map,
    property_type: db.property_type,
    status_publish: db.status_publish,
    price: {
      phone_deposit: db.phone_deposit,
      overtime: {
        electricity: db.price_overtime_electricity,
        lighting: db.price_overtime_lighting,
        ac: db.price_overtime_ac,
      },
      ground_floor_sqm: db.price_ground_floor_sqm,
      rent_sqm: db.price_rent_sqm,
      service_charge: {
        price: db.service_charge,
        info: db.service_charge_info,
      },
      parking_charge: {
        reserved: {
          car: db.parking_charge_reserved_car,
          motorcycle: db.parking_charge_reserved_motorcycle,
        },
        unreserved: {
          car: db.parking_charge_unreserved_car,
          motorcycle: db.parking_charge_unreserved_motorcycle,
        },
      },
    },
    completion: db.completion,
    amenities: db.amenities,
    spesification: {
      property_size: db.property_size,
      office_hours_weekday: db.office_hours_weekday,
      office_hours_weekend: db.office_hours_weekend,

      total_floor: db.total_floor,
      size_floor: db.size_floor,
      provider_internet: db.provider_internet,
    },
    nearby: {
      bus_station: db.nearby_bus_station,
      hospital: db.nearby_hospital,
      police: db.nearby_police,
      mall: db.nearby_mall,
    },
    units: db.units,
    images: db.images,
    created_at: dayjs(db.created_at).format('MMMM D, YYYY'),
    updated_at: dayjs(db.updated_at).format('MMMM D, YYYY'),
  };
}

export async function mapDbToResList(
  dbs: PropertiesDB[],
): Promise<ResProperty[]> {
  const resp: ResProperty[] = dbs.map((db) => {
    return {
      property_id: db.property_id,
      property_status: db.property_status,
      popular: db.popular,
      name: db.name,
      slug: db.slug,
      description: db.description,
      address: db.address,
      location: db.location,
      koordinat_map: db.koordinat_map,
      property_type: db.property_type,
      status_publish: db.status_publish,
      price: {
        phone_deposit: db.phone_deposit,
        overtime: {
          electricity: db.price_overtime_electricity,
          lighting: db.price_overtime_lighting,
          ac: db.price_overtime_ac,
        },
        ground_floor_sqm: db.price_ground_floor_sqm,
        rent_sqm: db.price_rent_sqm,
        service_charge: {
          price: db.service_charge,
          info: db.service_charge_info,
        },
        parking_charge: {
          reserved: {
            car: db.parking_charge_reserved_car,
            motorcycle: db.parking_charge_reserved_motorcycle,
          },
          unreserved: {
            car: db.parking_charge_unreserved_car,
            motorcycle: db.parking_charge_unreserved_motorcycle,
          },
        },
      },
      completion: db.completion,
      amenities: db.amenities,
      spesification: {
        property_size: db.property_size,
        office_hours_weekday: db.office_hours_weekday,
        office_hours_weekend: db.office_hours_weekend,
        total_floor: db.total_floor,
        size_floor: db.size_floor,
        provider_internet: db.provider_internet,
      },
      nearby: {
        bus_station: db.nearby_bus_station,
        hospital: db.nearby_hospital,
        police: db.nearby_police,
        mall: db.nearby_mall,
      },
      units: db.units,
      images: db.images,
      created_at: dayjs(db.created_at).format('MMMM D, YYYY'),
      updated_at: db.updated_at
        ? dayjs(db.updated_at).format('MMMM D, YYYY')
        : null,
    };
  });

  return resp;
}
