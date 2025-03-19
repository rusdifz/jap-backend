import { PropertiesDB, generateSlug, IJwtUser } from 'src/common';
import { ReqCreatePropertyDTO, ReqUpdatePropertyDTO } from '../dto/request.dto';

export async function mapReqCreateToDb(
  payload: ReqCreatePropertyDTO,
  admin: IJwtUser,
): Promise<Partial<PropertiesDB>> {
  console.log('payload', payload);

  return {
    name: payload.name,
    popular: payload.popular,
    slug: generateSlug(payload.name),
    description: payload.description
      ? payload.description
      : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    address: payload.address,
    location: payload.location,
    koordinat_map: payload.koordinat_map,
    status_publish: payload.status_publish,
    property_type: payload.property_type,
    phone_deposit: payload.price.phone_deposit,
    price_overtime_ac: payload.price.overtime.ac,
    price_overtime_electricity: payload.price.overtime.electricity,
    price_overtime_lighting: payload.price.overtime.lighting,
    price_ground_floor_sqm: payload.price.ground_floor_sqm,
    price_rent_sqm: payload.price.rent_sqm,
    service_charge: payload.price.service_charge.price,
    service_charge_info: payload.price.service_charge.info,
    parking_charge_reserved_car: payload.price.parking_charge.reserved.car,
    parking_charge_reserved_motorcycle:
      payload.price.parking_charge.reserved.motorcycle,
    parking_charge_unreserved_car: payload.price.parking_charge.unreserved.car,
    parking_charge_unreserved_motorcycle:
      payload.price.parking_charge.unreserved.motorcycle,
    completion: payload.completion,
    amenities: payload.amenities,
    property_size: payload.spesification.property_size,
    office_hours_weekday: payload.spesification.office_hours_weekday,
    office_hours_weekend: payload.spesification.office_hours_weekend,
    total_floor: payload.spesification.total_floor,
    size_floor: payload.spesification.size_floor,
    nearby_bus_station: payload.nearby.bus_station,
    nearby_hospital: payload.nearby.hospital,
    nearby_police: payload.nearby.police,
    nearby_mall: payload.nearby.mall,
    created_by: admin?.user?.username ?? 'system',
  };
}

export async function mapReqUpdateToDB(
  payload: ReqUpdatePropertyDTO,
  admin: IJwtUser,
): Promise<Partial<PropertiesDB>> {
  return {
    property_id: payload.property_id,
    popular: payload.popular,
    name: payload.name,
    slug: generateSlug(payload.name),
    description: payload.description,
    address: payload.address,
    location: payload.location,
    koordinat_map: payload.koordinat_map,
    status_publish: payload.status_publish,
    property_type: payload.property_type,
    phone_deposit: payload.price.phone_deposit,
    price_overtime_ac: payload.price.overtime.ac,
    price_overtime_electricity: payload.price.overtime.electricity,
    price_overtime_lighting: payload.price.overtime.lighting,
    price_ground_floor_sqm: payload.price.ground_floor_sqm,
    price_rent_sqm: payload.price.rent_sqm,
    service_charge: payload.price.service_charge.price,
    service_charge_info: payload.price.service_charge.info,
    parking_charge_reserved_car: payload.price.parking_charge.reserved.car,
    parking_charge_reserved_motorcycle:
      payload.price.parking_charge.reserved.motorcycle,
    parking_charge_unreserved_car: payload.price.parking_charge.unreserved.car,
    parking_charge_unreserved_motorcycle:
      payload.price.parking_charge.unreserved.motorcycle,
    completion: payload.completion,
    amenities: payload.amenities,
    property_size: payload.spesification.property_size,
    office_hours_weekday: payload.spesification.office_hours_weekday,
    office_hours_weekend: payload.spesification.office_hours_weekend,
    total_floor: payload.spesification.total_floor,
    size_floor: payload.spesification.size_floor,
    nearby_bus_station: payload.nearby.bus_station,
    nearby_hospital: payload.nearby.hospital,
    nearby_police: payload.nearby.police,
    nearby_mall: payload.nearby.mall,
    updated_by: admin?.user?.username ?? 'system',
  };
}
