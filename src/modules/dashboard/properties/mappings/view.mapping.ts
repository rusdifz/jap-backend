import { dayjs, MediaDB, PropertiesDB } from 'src/common';
import { ResProperty } from '../dto/response.dto';

export async function mapDbToResDetail(
  db: PropertiesDB,
  images: MediaDB[],
): Promise<ResProperty> {
  return {
    property_id: Number(db.property_id),
    property_status: db.property_status,
    popular: db.popular,
    name: db.name,
    slug: db.slug,
    description: db.description,
    address: db.address,
    thumbnail: db.thumbnail,
    url_youtube: db.url_youtube,
    location: db.location,
    koordinat_map: db.koordinat_map,
    property_type: db.property_type,
    status_publish: db.status_publish,
    price: {
      phone_deposit: db.phone_deposit,
      booking_deposit: db.booking_deposit,
      security_deposit: db.security_deposit,
      overtime: {
        electricity: db.price_overtime_electricity,
        lighting: db.price_overtime_lighting,
        ac: db.price_overtime_ac,
      },
      ground_floor: db.price_ground_floor,
      rent_average: db.price_rent_average,
      service_charge: {
        price: db.service_charge_price,
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
    telecommunication: {
      isp: db.telecommunication_isp,
      fiber_optic: db.telecommunication_fiber_optic,
      wifi: db.telecommunication_wifi,
    },
    fire_safety: {
      sprinkle: db.fire_safety_sprinkle,
      heat_detector: db.fire_safety_heat_detector,
      smoke_detector: db.fire_safety_smoke_detector,
    },
    terms: {
      minium_lease: db.minimum_lease_term,
      payment: db.payment_term,
    },
    other_info: {
      loading_capacity: db.other_info_loading_capacity,
      ac_system: db.other_info_ac_system,
      ac_zoning: db.other_info_ac_zoning,
      electricity: db.other_info_electricity,
      power_unit: db.other_info_power_unit,
    },
    seo_key: db.seo_key,
    units: db.units,
    // pic: db.pic,
    images: images ?? [],
    ac_info: db.ac_info,
    electricity_info: db.electricity_info,
    lighting_info: db.lighting_info,
    created_at: dayjs(db.created_at).format('MMMM D, YYYY'),
    updated_at: dayjs(db.updated_at).format('MMMM D, YYYY'),
  };
}

export async function mapDbToResList(
  dbs: PropertiesDB[],
): Promise<ResProperty[]> {
  const resp: ResProperty[] = dbs.map((db) => {
    return {
      property_id: Number(db.property_id),
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
        booking_deposit: db.booking_deposit,
        security_deposit: db.security_deposit,
        overtime: {
          electricity: db.price_overtime_electricity,
          lighting: db.price_overtime_lighting,
          ac: db.price_overtime_ac,
        },
        ground_floor: db.price_ground_floor,
        rent_average: db.price_rent_average,
        service_charge: {
          price: db.service_charge_price,
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
      telecommunication: {
        isp: db.telecommunication_isp,
        fiber_optic: db.telecommunication_fiber_optic,
        wifi: db.telecommunication_wifi,
      },
      fire_safety: {
        sprinkle: db.fire_safety_sprinkle,
        heat_detector: db.fire_safety_heat_detector,
        smoke_detector: db.fire_safety_smoke_detector,
      },
      terms: {
        minium_lease: db.minimum_lease_term,
        payment: db.payment_term,
      },
      other_info: {
        loading_capacity: db.other_info_loading_capacity,
        ac_system: db.other_info_ac_system,
        ac_zoning: db.other_info_ac_zoning,
        electricity: db.other_info_electricity,
        power_unit: db.other_info_power_unit,
      },
      seo_key: db.seo_key,
      units: db.units,
      // pic: db.pic,
      ac_info: db.ac_info,
      electricity_info: db.electricity_info,
      lighting_info: db.lighting_info,
      images: db.images ?? [],
      created_at: dayjs(db.created_at).format('MMMM D, YYYY'),
      updated_at: db.updated_at
        ? dayjs(db.updated_at).format('MMMM D, YYYY')
        : null,
    };
  });

  return resp;
}
