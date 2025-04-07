import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

import { readFileSync } from 'fs';
import {
  FindManyOptions,
  FindOneOptions,
  In,
  LessThanOrEqual,
  Like,
} from 'typeorm';

import {
  ConditionUnitEnum,
  IJwtUser,
  LocationEnum,
  PropertyStatusEnum,
  PropertyTypeEnum,
  StatusPublishEnum,
  PropertiesDB,
  dayjs,
} from 'src/common';

import { PropertiesDTO } from '../dto/request.dto';
// import { MasterPropertiesService } from 'apps/master/src/modules/properties/properties.service';

import { ReqCreatePropertyDTO, ReqUpdatePropertyDTO } from '../dto/request.dto';
import { ResProperty } from '../dto/response.dto';
import { mapDbToResDetail, mapDbToResList } from '../mappings/view.mapping';
import { mapReqCreateToDb, mapReqUpdateToDB } from '../mappings/upsert.mapping';
import { ReqCreateUnitDTO } from '../../units/dto/request.dto';
import { DashboardUnitsService } from '../../units/units.service';
import { DashboardPropertiesRepository } from '../properties.repository';

@Injectable()
export class DashboardPropertiesService {
  constructor(
    private readonly repository: DashboardPropertiesRepository,
    private readonly unitService: DashboardUnitsService,
  ) {}

  // async get(property_id: number | string): Promise<ResProperty> {
  async get(property_id: number | string): Promise<any> {
    const queryWhere: any = isNaN(Number(property_id))
      ? { slug: property_id.toString() }
      : { property_id };

    const query: FindOneOptions<PropertiesDB> = {
      where: queryWhere,
      relations: {
        units: true,
        images: true,
      },
    };

    const property = await this.repository.findOne(query);
    // return property;
    return property ? await mapDbToResDetail(property) : null;
  }

  async getList(
    props: PropertiesDTO,
  ): Promise<{ data: ResProperty[]; count: number }> {
    console.log('props get list', props);

    // initiate empty where query
    let query: FindManyOptions<PropertiesDB> = {
      where: {},
      // order: {
      //   created_at: 'desc',
      // },
      relations: { units: true, images: true },
    };

    // sort & order query
    query = await this.repository.sort(query, props);

    // pagination query
    query = await this.repository.paginate(query, props);

    //assign query where
    if (props.amenities) {
      Object.assign(query.where, { amenities: Like(`%${props.amenities}%`) });
    }

    if (props.location) {
      Object.assign(query.where, { location: props.location.toLowerCase() });
    }

    if (props.property_type) {
      Object.assign(query.where, { property_type: props.property_type });
    }

    if (props.property_status) {
      // Object.assign(query.where, { property_type: props.property_status });
    }

    if (props.search_keyword) {
      Object.assign(query.where, { name: Like(`%${props.search_keyword}%`) });
    }

    const search = await this.repository.findAndCount(query);

    const properties =
      search[0].length > 0 ? await mapDbToResList(search[0]) : [];

    return { data: properties, count: search[1] };
  }

  async create(
    body: ReqCreatePropertyDTO,
    admin: IJwtUser,
  ): Promise<ReqCreatePropertyDTO> {
    const mapProperty = await mapReqCreateToDb(body, admin);

    const saveData = await this.repository.save(mapProperty);

    body['property_id'] = saveData.property_id;
    return body;
  }

  async update(
    body: ReqUpdatePropertyDTO,
    admin: IJwtUser,
  ): Promise<ReqUpdatePropertyDTO> {
    const mapProperty = await mapReqUpdateToDB(body, admin);
    await this.repository.update(
      { property_id: mapProperty.property_id },
      mapProperty,
    );
    return body;
  }

  async delete(property_id: number, admin: IJwtUser): Promise<Object> {
    await Promise.all([
      this.repository.softDelete({ property_id }),
      this.repository.update(
        { property_id },
        { deleted_by: admin?.user?.username ?? 'system' },
      ),
      // this.masterUnitsService.deleteAndLogByPropertyId(property_id, admin),
    ]);

    return {};
  }

  async updateTotalUnit(property_id: number): Promise<number> {
    const currentUnitTotal =
      await this.unitService.countUnitByPropertyId(property_id);

    await this.repository.update(
      { property_id },
      { total_unit: currentUnitTotal },
    );

    return currentUnitTotal;
  }

  async decreaseTotalUnit(unit_id: string): Promise<number> {
    const searchDelete = await this.unitService.getDeleteData(unit_id);

    if (searchDelete) {
      const currentUnitTotal = await this.unitService.countUnitByPropertyId(
        searchDelete.property_id,
      );
      await this.repository.update(
        { property_id: searchDelete.property_id },
        { total_unit: currentUnitTotal },
      );
      return currentUnitTotal;
    }

    return null;
  }

  //notification ketika data tidak di update sebulan
  async checkForStaleDataOlderThanOneMonth() {
    const monthAgo = dayjs().subtract(1, 'month').format('YYYY-MM-DD');

    const properties = await this.repository.find({
      select: {
        property_id: true,
        name: true,
        slug: true,
        updated_at: true,
      },
      where: {
        updated_at: LessThanOrEqual(monthAgo),
      },
    });

    let message = [];

    if (properties.length > 0) {
      for (const property of properties) {
        const formateDay = dayjs(property.updated_at).format(
          'dddd, D MMMM, YYYY h:mm A',
        );
        // message.push(
        //   `Data Property ${property.name} dengan ID ${property.property_id} terakhir di update ${formateDay}`,
        // );
        message.push({
          id: property.property_id,
          name: property.name,
          date: formateDay,
        });
      }
    }

    return message;
  }

  async inputBulkFromExcel() {
    const dirName = __dirname;

    const dirExcel = dirName.replace('/dist/modules/dashboard', '/spread.xlsx');

    const excelData = readFileSync(dirExcel);

    // // Baca workbook dari file buffer
    const workbook: XLSX.WorkBook = XLSX.read(excelData.buffer, {
      type: 'buffer',
    });

    // Ambil sheet pertama
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // // Konversi data sheet ke JSON
    const jsonData: any = XLSX.utils.sheet_to_json(worksheet);

    let key = 0;

    let propertyId = 0;

    const arr = [];
    console.log('sini', jsonData);

    for (const dt of jsonData) {
      console.log('dt', dt);

      if (dt.no && typeof dt.no === 'number') {
        key = dt.no;

        const property: ReqCreatePropertyDTO = {
          name: dt.nama_gedung,
          popular: 0,
          description: dt.description ?? '',
          address: dt.address ?? '',
          location: LocationEnum.THAMRIN,
          koordinat_map: dt.koordinat_map ?? dt.address ?? dt.building,
          property_type: PropertyTypeEnum.OFFICE,
          completion: dt.completion,
          status_publish: StatusPublishEnum.PUBLISH,
          amenities: [
            'A/C & Heating',
            'Bank & ATM Centre',
            'Minimarket',
            'Restaurants',
            'Cafe & Coffee Shop',
          ],
          price: {
            phone_deposit: dt.phone_deposit,
            booking_deposit: '',
            security_deposit: '',
            ground_floor_sqm: dt.ground_floor,
            rent_sqm: dt.rent
              ? typeof dt.rent === 'string'
                ? dt.rent.replace(/\D/g, '')
                : dt.rent
              : 0,
            overtime: {
              electricity: dt.overtime_electric,
              lighting: dt.overtime_lighting,
              ac: dt.overtime_ac,
            },
            service_charge: {
              price: dt.service_charge
                ? typeof dt.service_charge === 'string'
                  ? dt.service_charge.replace(/\D/g, '')
                  : dt.service_charge
                : 0,
              info: dt.service_charge_info,
            },
            parking_charge: {
              reserved: {
                car: dt?.reserved_car,
                motorcycle: dt?.reserved_motor,
              },
              unreserved: {
                car: dt?.unreserved_car,
                motorcycle: dt?.unreserved_motor,
              },
            },
          },
          spesification: {
            property_size: dt.total_size,
            office_hours_weekday: dt.office_hours_weekdays,
            office_hours_weekend: dt.office_hours_weekend,
            total_floor: dt.floor,
            size_floor: dt.floor_size
              ? typeof dt.floor_size === 'string'
                ? dt.floor_size.replace(/\D/g, '')
                : dt.floor_size
              : 0,
            provider_internet: dt.internet,
          },
          nearby: {
            bus_station: '',
            hospital: '',
            police: '',
            mall: '',
          },
          telecommunication: {
            isp: true,
            fiber_optic: true,
            wifi: true,
          },
          fire_safety: {
            sprinkle: true,
            heat_detector: true,
            smoke_detector: true,
          },
          terms: {
            minium_lease: '',
            payment: '',
          },
          other_info: {
            loading_capacity: '',
            ac_system: '',
            ac_zoning: '',
            electricity: '',
            power_unit: '',
          },
        };

        const insertProperty: any = await this.create(property, null);

        propertyId = insertProperty.property_id;

        const unit: ReqCreateUnitDTO = {
          property_id: propertyId,
          size: dt.unit_size
            ? typeof dt.unit_size === 'string'
              ? Number(dt.unit_size.toString().replace(/,/g, ''))
              : 0
            : 0,
          floor: dt.unit_floor,
          condition: dt.unit_condition
            ? Object.values(dt.unit_condition).includes(ConditionUnitEnum)
              ? dt.unit_condition
              : ConditionUnitEnum.BARE
            : ConditionUnitEnum.BARE,
          rent_sqm: dt.unit_rent,
          available: true,
          pic_name: dt.pic_name,
          pic_phone: dt.pic_phone,
          status: PropertyStatusEnum.LEASE,
        };

        await this.unitService.create(unit, null);

        arr.push(property);
      } else {
        const unit: ReqCreateUnitDTO = {
          property_id: propertyId,
          size: dt.unit_size
            ? Number(dt.unit_size.toString().replace(/,/g, ''))
            : 0,
          floor: dt.unit_floor,
          condition: dt.unit_condition
            ? Object.values(dt.unit_condition).includes(ConditionUnitEnum)
              ? dt.unit_condition
              : ConditionUnitEnum.BARE
            : ConditionUnitEnum.BARE,
          available: true,
          rent_sqm: dt.unit_rent,
          pic_name: dt.pic_name,
          pic_phone: dt.pic_phone,
          status: PropertyStatusEnum.LEASE,
        };

        await this.unitService.create(unit, null);
      }
    }

    return arr;
  }
}
