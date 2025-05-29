import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

import { readFileSync } from 'fs';
import {
  Between,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
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
  MediaReferenceType,
  monthAgo,
} from 'src/common';

import {
  PropertiesDTO,
  ReqCreatePropertyPicDTO,
  ReqGetPicListDTO,
  ReqUpdatePropertyPicDTO,
} from '../dto/request.dto';
// import { MasterPropertiesService } from 'apps/master/src/modules/properties/properties.service';

import { ReqCreatePropertyDTO, ReqUpdatePropertyDTO } from '../dto/request.dto';
import { ResProperty } from '../dto/response.dto';
import { mapDbToResDetail, mapDbToResList } from '../mappings/view.mapping';
import { mapReqCreateToDb, mapReqUpdateToDB } from '../mappings/upsert.mapping';
import { ReqCreateUnitDTO } from '../../units/dto/request.dto';
import { DashboardUnitsService } from '../../units/units.service';
import { DashboardPropertiesRepository } from '../properties.repository';
import { DashboardImagesService } from '../../images/images.service';

@Injectable()
export class DashboardPropertiesService {
  constructor(
    private readonly repository: DashboardPropertiesRepository,
    private readonly unitService: DashboardUnitsService,
    private readonly imageService: DashboardImagesService,
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
        pic: true,
        // images: true,
      },
    };

    const property = await this.repository.findOne(query);
    const images = await this.imageService.findImageJoin(
      property.property_id,
      MediaReferenceType.PROPERTY,
    );

    return property ? await mapDbToResDetail(property, images) : null;
  }

  async getList(
    props: PropertiesDTO,
  ): Promise<{ data: ResProperty[]; count: number }> {
    // initiate empty where query
    let query: FindManyOptions<PropertiesDB> = {
      where: {},
      relations: { units: true },
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
      Object.assign(query.where, {
        location: Like(`%${props.location.toLowerCase()}%`),
      });
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

    if (props.condition) {
      Object.assign(query.where, { units: { condition: props.condition } });
    }

    if (props.unit_size) {
      if (props.unit_size >= 1000) {
        Object.assign(query.where, {
          units: { size: MoreThanOrEqual(props.unit_size) },
        });
      } else if (props.unit_size == 100) {
        Object.assign(query.where, {
          units: { size: LessThan(200) },
        });
      } else {
        Object.assign(query.where, {
          units: { size: Between(props.unit_size, props.unit_size + 99) },
        });
      }
    }

    if (props.min_rent_sqm && props.max_rent_sqm) {
      Object.assign(query.where, {
        units: { rent_sqm: Between(props.min_rent_sqm, props.max_rent_sqm) },
      });
    }
    console.time('getDB');
    const search = await this.repository.findAndCount(query);
    console.timeEnd('getDB');
    const properties =
      search[0].length > 0 ? await mapDbToResList(search[0]) : [];

    return { data: properties, count: search[1] };
  }

  async getListCustom(queryOptions: FindManyOptions<PropertiesDB>) {
    return await this.repository.find(queryOptions);
  }

  async CountData(queryWhere: FindOptionsWhere<PropertiesDB>) {
    return await this.repository.count({ where: { ...queryWhere } });
  }

  async CountDataJoinTable(queryWhere: FindOptionsWhere<PropertiesDB>) {
    // initiate empty where query

    let query: FindManyOptions<PropertiesDB> = {
      where: queryWhere,
      relations: { units: true },
    };

    return await this.repository.count(query);
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

  async getListPic(
    props: ReqGetPicListDTO,
  ): Promise<{ data: any[]; count: number }> {
    const searchData = await this.repository.findListPic(props);

    return searchData;
  }

  async createPic(
    body: ReqCreatePropertyPicDTO,
    admin: IJwtUser,
  ): Promise<ReqCreatePropertyPicDTO> {
    console.log('body', body);

    const mapPic = {
      pic_name: body.pic_name ?? '',
      pic_phone: body.pic_phone ?? '',
      property_id: body.property_id,
      created_by: admin.user.username,
    };
    console.log('map', mapPic);

    const saveData = await this.repository.savePic(mapPic);

    body['id'] = saveData.id;
    return body;
  }

  async updatePic(
    body: ReqUpdatePropertyPicDTO,
    admin: IJwtUser,
  ): Promise<ReqUpdatePropertyPicDTO> {
    const mapPic = {
      pic_name: body.pic_name ?? '',
      pic_phone: body.pic_phone ?? '',
      updated_by: admin.user.username,
    };

    await this.repository.updatePic(mapPic, body.pic_id);

    return body;
  }

  async deletePic(pic_id: string, admin: IJwtUser): Promise<Object> {
    return await this.repository.deletePic(pic_id);
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

    const dirExcel = dirName.replace(
      '/dist/modules/dashboard/properties/services',
      '/spread.xlsx',
    );

    const excelData = readFileSync(dirExcel);

    // // Baca workbook dari file buffer
    const workbook: XLSX.WorkBook = XLSX.read(excelData.buffer, {
      type: 'buffer',
    });

    // Ambil sheet pertama
    // console.log('work', workbook.SheetNames);

    const sheetName = workbook.SheetNames[1];

    const worksheet = workbook.Sheets[sheetName];

    // // Konversi data sheet ke JSON
    const jsonData: any = XLSX.utils.sheet_to_json(worksheet);

    let key = 0;

    let propertyId = 0;

    const arr = [];
    // console.log('cuy', jsonData);

    for (const dt of jsonData) {
      // console.log('dt', dt);

      if (dt.no && typeof dt.no === 'number') {
        console.log('dt', dt);

        key = dt.no;

        const description = dt.description
          ? dt.description.trim()
          : dt.nama_gedung +
            ' adalah gedung perkantoran dengan lokasi yang strategis, akses mudah, serta kapasitas parkir yang luas. Gedung ini memiliki luas bangunan sekitar 25.386 meter persegi dan total 30 lantai, serta dilengkapi fasilitas gedung mulai dari 7 lift dalam dua zona (low zone dan high zone), 1 service lift, kantin, ATM, bank, parkir untuk total sekitar  1000 unit kendaraan, keamanan selama 24 jam, system back-up power dan internet berkecepatan tinggi. Wisma Nusantara adalah gedung grade B yang lokasinya berada di jalan M.H. Thamrin No. 59 Jakarta Pusat. Gedung ini berdekatan dengan jalan Sudirman, tanah abang, menteng. Sarana transportasi umum  mudah didapatkan di area gedung ini mulai dari bus kota (Metro Mini, Mayasari Bakti, PPD, Agung Bhakti, dan Kopaja), TransJakarta , taksi, transportasi online, stasiun KRL sudirman dan MRT.';

        const property: ReqCreatePropertyDTO = {
          name: dt.nama_gedung.trim(),
          popular: 0,
          description: description,
          url_youtube: '',
          address: dt.address ? dt.address.trim() : '',
          location: LocationEnum.JAKARTA_TIMUR,
          koordinat_map: dt.koordinat_map
            ? dt.koordinat_map.trim()
            : dt.address
              ? dt.address.trim()
              : dt.nama_gedung.trim(),
          property_type: dt.property_type ?? PropertyTypeEnum.OFFICE,
          completion: dt.completion,
          status_publish: StatusPublishEnum.PUBLISH,
          amenities: [
            'A/C & Heating',
            'Bank & ATM Centre',
            'Minimarket',
            'Restaurants',
            'Cafe & Coffee Shop',
          ],
          ac_info: '',
          lighting_info: '',
          electricity_info: '',
          price: {
            phone_deposit: dt.phone_deposit ?? 'tba',
            booking_deposit: 'tba',
            security_deposit: 'tba',
            ground_floor_sqm: dt.ground_floor ?? 0,
            rent_sqm: dt.rent_price
              ? typeof dt.rent_price === 'string'
                ? isNaN(Number(dt.rent_price))
                  ? 0
                  : dt.rent_price.replace(/\D/g, '')
                : dt.rent_price
              : 0,
            overtime: {
              electricity: dt.overtime_electricity
                ? typeof dt.overtime_electric === 'string'
                  ? dt.overtime_electric.substring(0, 300)
                  : dt.overtime_electric
                : 'tba',
              lighting: dt.overtime_lighting
                ? typeof dt.overtime_lighting === 'string'
                  ? dt.overtime_lighting.substring(0, 300)
                  : dt.overtime_lighting
                : 'tba',
              ac: dt.overtime_ac
                ? typeof dt.overtime_ac === 'string'
                  ? dt.overtime_ac.substring(0, 400)
                  : dt.overtime_ac
                : 'tba',
            },
            service_charge: {
              price: dt.service_charge
                ? typeof dt.service_charge === 'string'
                  ? dt.service_charge.replace(/\D/g, '')
                  : dt.service_charge.trim()
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
            property_size: dt.total_size
              ? typeof dt.total_size === 'string'
                ? dt.total_size === 'tba'
                : 0
              : dt.total_size,
            office_hours_weekday: dt.office_hours_weekdays,
            office_hours_weekend: dt.office_hours_weekend,
            total_floor: dt.floor_total,
            size_floor: dt.floor_size
              ? typeof dt.floor_size === 'string'
                ? dt.floor_size === 'tba'
                  ? 0
                  : dt.floor_size.replace(/\D/g, '')
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

        console.log('create', property);

        const insertProperty: any = await this.create(property, null);

        propertyId = insertProperty.property_id;

        // if (dt.unit_size && dt.unit_floor) {
        // const unitSize = isNaN(
        //   Number(dt.unit_size.toString().replace(/,/g, '')),
        // )
        //   ? 0
        //   : Number(dt.unit_size.toString().replace(/,/g, ''));
        // console.log('unit size', unitSize);

        let unitSize = 0;

        if (dt.unitSize) {
          unitSize = isNaN(Number(dt.unit_size.toString().replace(/,/g, '')))
            ? 0
            : Number(dt.unit_size.toString().replace(/,/g, ''));
        }

        const unit: ReqCreateUnitDTO = {
          property_id: propertyId,
          size: unitSize,
          floor: dt.unit_floor,
          condition: dt.unit_condition
            ? Object.values(dt.unit_condition).includes(ConditionUnitEnum)
              ? dt.unit_condition
              : ConditionUnitEnum.BARE
            : ConditionUnitEnum.BARE,
          rent_sqm: dt.unit_rent,
          available: true,
          // pic_name: dt.pic_name,
          // pic_phone: dt.pic_phone,
          status: PropertyStatusEnum.LEASE,
        };

        await this.unitService.create(unit, null);
        // }

        arr.push(property);
      } else {
        // if (dt.unit_size && dt.unit_floor) {
        let unitSize = 0;

        if (dt.unitSize) {
          unitSize = isNaN(Number(dt.unit_size.toString().replace(/,/g, '')))
            ? 0
            : Number(dt.unit_size.toString().replace(/,/g, ''));
        }

        const unit: ReqCreateUnitDTO = {
          property_id: propertyId,
          size: unitSize,
          floor: dt.unit_floor ?? '',
          condition: dt.unit_condition
            ? Object.values(dt.unit_condition).includes(ConditionUnitEnum)
              ? dt.unit_condition
              : ConditionUnitEnum.BARE
            : ConditionUnitEnum.BARE,
          available: true,
          rent_sqm: dt.unit_rent ?? 0,
          // pic_name: dt.pic_name,
          // pic_phone: dt.pic_phone,
          status: PropertyStatusEnum.RENT,
        };

        await this.unitService.create(unit, null);
        // }
      }
    }

    return arr;
  }
}
