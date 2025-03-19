import { dayjs, PropertiesDB } from 'src/common/';
import { ResProperties, ResProperty } from '../dto/response.dto';

export async function mapDbToResDetail(db: PropertiesDB): Promise<ResProperty> {
  const propertyFeature = [
    {
      id: 1,
      title: 'Detail Description',
      feature_list: [
        {
          title: 'Property Type',
          value: db.property_type,
        },
        {
          title: 'Completion',
          value: db.completion,
        },
        {
          title: 'Phone Deposit',
          value: db.phone_deposit,
        },
        {
          title: 'Service Charge',
          value: db.service_charge,
        },
        {
          title: 'Parking Charge Car',
          value: db.parking_charge_reserved_car,
        },
        {
          title: 'Service Charge Info',
          value: db.service_charge_info,
        },
        {
          title: 'Parking Charge Motorcycle',
          value: db.parking_charge_reserved_motorcycle,
        },
        {
          title: 'Office Hour Weekday',
          value: db.office_hours_weekday,
        },
        {
          title: 'Total Floor',
          value: db.total_floor,
        },
        {
          title: 'Office Hour Weekend',
          value: db.office_hours_weekend,
        },
        {
          title: 'Size Floor',
          value: db.size_floor,
        },
      ],
    },
    {
      id: 2,
      title: 'Nearby',
      feature_list: [
        {
          title: 'Bus Station',
          value: db.nearby_bus_station !== '' ? db.nearby_bus_station : '1Km',
        },
        {
          title: 'Shopping Mall',
          value: db.nearby_mall !== '' ? db.nearby_mall : '1Km',
        },
        {
          title: 'Hospital',
          value: db.nearby_hospital !== '' ? db.nearby_hospital : '1Km',
        },
        {
          title: 'Police',
          value: db.nearby_police !== '' ? db.nearby_police : '1Km',
        },
      ],
    },
    {
      id: 3,
      title: 'Amenities',
    },
  ];

  return {
    property_id: db.property_id,
    property_status: db.property_status,
    name: db.name,
    slug: db.slug,
    description: db.description,
    address: db.address,
    location: db.location,
    koordinat_map: db.koordinat_map,
    property_type: db.property_type,
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
    },
    nearby: {
      bus_station: db.nearby_bus_station,
      hospital: db.nearby_hospital,
      police: db.nearby_police,
      mall: db.nearby_mall,
    },
    property_feature: propertyFeature,
    units: db.units.length > 0 ? db.units.slice(0, 5) : [],
    images: db.images,
    created_at: dayjs(db.created_at).format('MMMM D, YYYY'),
    updated_at: dayjs(db.updated_at).format('MMMM D, YYYY'),
  };
}

export async function mapDbToResList(
  dbs: PropertiesDB[],
): Promise<ResProperties[]> {
  const resp: ResProperties[] = dbs.map((db) => {
    return {
      property_id: db.property_id,
      name: db.name,
      slug: db.slug,
      location: db.location,
      property_type: db.property_type,
      property_status: db.property_status,
      price: {
        rent_sqm: db.price_rent_sqm,
      },
      spesification: {
        property_size: db.property_size,
      },
      images: db.images,
      created_at: dayjs(db.created_at).format('MMMM D, YYYY'),
      updated_at: dayjs(db.updated_at).format('MMMM D, YYYY'),
    };
  });

  return resp;
}
