"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardPropertiesService = void 0;
const common_1 = require("@nestjs/common");
const XLSX = require("xlsx");
const fs_1 = require("fs");
const typeorm_1 = require("typeorm");
const common_2 = require("../../../../common");
const view_mapping_1 = require("../mappings/view.mapping");
const upsert_mapping_1 = require("../mappings/upsert.mapping");
const units_service_1 = require("../../units/units.service");
const properties_repository_1 = require("../properties.repository");
const images_service_1 = require("../../images/images.service");
let DashboardPropertiesService = class DashboardPropertiesService {
    constructor(repository, unitService, imageService) {
        this.repository = repository;
        this.unitService = unitService;
        this.imageService = imageService;
    }
    async get(property_id) {
        const queryWhere = isNaN(Number(property_id))
            ? { slug: property_id.toString() }
            : { property_id };
        const query = {
            where: queryWhere,
            relations: {
                units: true,
                pic: true,
            },
        };
        const property = await this.repository.findOne(query);
        const images = await this.imageService.findImageJoin(property.property_id, common_2.MediaReferenceType.PROPERTY);
        return property ? await (0, view_mapping_1.mapDbToResDetail)(property, images) : null;
    }
    async getList(props) {
        let query = {
            where: {},
            relations: ['units'],
        };
        query = await this.repository.sort(query, props);
        query = await this.repository.paginate(query, props);
        if (props.amenities) {
            Object.assign(query.where, { amenities: (0, typeorm_1.Like)(`%${props.amenities}%`) });
        }
        if (props.location) {
            Object.assign(query.where, {
                location: (0, typeorm_1.Like)(`%${props.location.toLowerCase()}%`),
            });
        }
        if (props.property_type) {
            Object.assign(query.where, { property_type: props.property_type });
        }
        if (props.property_status) {
        }
        if (props.search_keyword) {
            Object.assign(query.where, { name: (0, typeorm_1.Like)(`%${props.search_keyword}%`) });
        }
        if (props.condition) {
            Object.assign(query.where, { units: { condition: props.condition } });
        }
        if (props.unit_size) {
            if (props.unit_size >= 1000) {
                Object.assign(query.where, {
                    units: { size: (0, typeorm_1.MoreThanOrEqual)(props.unit_size) },
                });
            }
            else if (props.unit_size == 100) {
                Object.assign(query.where, {
                    units: { size: (0, typeorm_1.LessThan)(200) },
                });
            }
            else {
                Object.assign(query.where, {
                    units: { size: (0, typeorm_1.Between)(props.unit_size, props.unit_size + 99) },
                });
            }
        }
        if (props.min_rent_sqm && props.max_rent_sqm) {
            Object.assign(query.where, {
                units: { rent_sqm: (0, typeorm_1.Between)(props.min_rent_sqm, props.max_rent_sqm) },
            });
        }
        const search = await this.repository.findAndCount(query);
        return { data: search[0], count: search[1] };
    }
    async getListCustom(queryOptions) {
        return await this.repository.find(queryOptions);
    }
    async CountData(queryWhere) {
        return await this.repository.count({ where: { ...queryWhere } });
    }
    async CountDataJoinTable(queryWhere) {
        let query = {
            where: queryWhere,
            relations: { units: true },
        };
        return await this.repository.count(query);
    }
    async create(body, admin) {
        const mapProperty = await (0, upsert_mapping_1.mapReqCreateToDb)(body, admin);
        const saveData = await this.repository.save(mapProperty);
        body['property_id'] = saveData.property_id;
        return body;
    }
    async update(body, admin) {
        const mapProperty = await (0, upsert_mapping_1.mapReqUpdateToDB)(body, admin);
        await this.repository.update({ property_id: mapProperty.property_id }, mapProperty);
        return body;
    }
    async delete(property_id, admin) {
        await Promise.all([
            this.repository.softDelete({ property_id }),
            this.repository.update({ property_id }, { deleted_by: admin?.user?.username ?? 'system' }),
        ]);
        return {};
    }
    async getListPic(props) {
        const searchData = await this.repository.findListPic(props);
        return searchData;
    }
    async createPic(body, admin) {
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
    async updatePic(body, admin) {
        const mapPic = {
            pic_name: body.pic_name ?? '',
            pic_phone: body.pic_phone ?? '',
            updated_by: admin.user.username,
        };
        await this.repository.updatePic(mapPic, body.pic_id);
        return body;
    }
    async deletePic(pic_id, admin) {
        return await this.repository.deletePic(pic_id);
    }
    async updateTotalUnit(property_id) {
        const currentUnitTotal = await this.unitService.countUnitByPropertyId(property_id);
        await this.repository.update({ property_id }, { total_unit: currentUnitTotal });
        return currentUnitTotal;
    }
    async decreaseTotalUnit(unit_id) {
        const searchDelete = await this.unitService.getDeleteData(unit_id);
        if (searchDelete) {
            const currentUnitTotal = await this.unitService.countUnitByPropertyId(searchDelete.property_id);
            await this.repository.update({ property_id: searchDelete.property_id }, { total_unit: currentUnitTotal });
            return currentUnitTotal;
        }
        return null;
    }
    async checkForStaleDataOlderThanOneMonth() {
        const properties = await this.repository.find({
            select: {
                property_id: true,
                name: true,
                slug: true,
                updated_at: true,
            },
            where: {
                updated_at: (0, typeorm_1.LessThanOrEqual)(common_2.monthAgo),
            },
        });
        let message = [];
        if (properties.length > 0) {
            for (const property of properties) {
                const formateDay = (0, common_2.dayjs)(property.updated_at).format('dddd, D MMMM, YYYY h:mm A');
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
        const dirExcel = dirName.replace('/dist/modules/dashboard/properties/services', '/spread.xlsx');
        const excelData = (0, fs_1.readFileSync)(dirExcel);
        const workbook = XLSX.read(excelData.buffer, {
            type: 'buffer',
        });
        const sheetName = workbook.SheetNames[1];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        let key = 0;
        let propertyId = 0;
        const arr = [];
        for (const dt of jsonData) {
            if (dt.no && typeof dt.no === 'number') {
                console.log('dt', dt);
                key = dt.no;
                const description = dt.description
                    ? dt.description.trim()
                    : dt.nama_gedung +
                        ' adalah gedung perkantoran dengan lokasi yang strategis, akses mudah, serta kapasitas parkir yang luas. Gedung ini memiliki luas bangunan sekitar 25.386 meter persegi dan total 30 lantai, serta dilengkapi fasilitas gedung mulai dari 7 lift dalam dua zona (low zone dan high zone), 1 service lift, kantin, ATM, bank, parkir untuk total sekitar  1000 unit kendaraan, keamanan selama 24 jam, system back-up power dan internet berkecepatan tinggi. Wisma Nusantara adalah gedung grade B yang lokasinya berada di jalan M.H. Thamrin No. 59 Jakarta Pusat. Gedung ini berdekatan dengan jalan Sudirman, tanah abang, menteng. Sarana transportasi umum  mudah didapatkan di area gedung ini mulai dari bus kota (Metro Mini, Mayasari Bakti, PPD, Agung Bhakti, dan Kopaja), TransJakarta , taksi, transportasi online, stasiun KRL sudirman dan MRT.';
                const property = {
                    name: dt.nama_gedung.trim(),
                    popular: 0,
                    description: description,
                    url_youtube: '',
                    address: dt.address ? dt.address.trim() : '',
                    location: common_2.LocationEnum.JAKARTA_TIMUR,
                    koordinat_map: dt.koordinat_map
                        ? dt.koordinat_map.trim()
                        : dt.address
                            ? dt.address.trim()
                            : dt.nama_gedung.trim(),
                    property_type: dt.property_type ?? common_2.PropertyTypeEnum.OFFICE,
                    completion: dt.completion,
                    status_publish: common_2.StatusPublishEnum.PUBLISH,
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
                const insertProperty = await this.create(property, null);
                propertyId = insertProperty.property_id;
                let unitSize = 0;
                if (dt.unitSize) {
                    unitSize = isNaN(Number(dt.unit_size.toString().replace(/,/g, '')))
                        ? 0
                        : Number(dt.unit_size.toString().replace(/,/g, ''));
                }
                const unit = {
                    property_id: propertyId,
                    size: unitSize,
                    floor: dt.unit_floor,
                    condition: dt.unit_condition
                        ? Object.values(dt.unit_condition).includes(common_2.ConditionUnitEnum)
                            ? dt.unit_condition
                            : common_2.ConditionUnitEnum.BARE
                        : common_2.ConditionUnitEnum.BARE,
                    rent_sqm: dt.unit_rent,
                    available: true,
                    status: common_2.PropertyStatusEnum.LEASE,
                };
                await this.unitService.create(unit, null);
                arr.push(property);
            }
            else {
                let unitSize = 0;
                if (dt.unitSize) {
                    unitSize = isNaN(Number(dt.unit_size.toString().replace(/,/g, '')))
                        ? 0
                        : Number(dt.unit_size.toString().replace(/,/g, ''));
                }
                const unit = {
                    property_id: propertyId,
                    size: unitSize,
                    floor: dt.unit_floor ?? '',
                    condition: dt.unit_condition
                        ? Object.values(dt.unit_condition).includes(common_2.ConditionUnitEnum)
                            ? dt.unit_condition
                            : common_2.ConditionUnitEnum.BARE
                        : common_2.ConditionUnitEnum.BARE,
                    available: true,
                    rent_sqm: dt.unit_rent ?? 0,
                    status: common_2.PropertyStatusEnum.RENT,
                };
                await this.unitService.create(unit, null);
            }
        }
        return arr;
    }
};
exports.DashboardPropertiesService = DashboardPropertiesService;
exports.DashboardPropertiesService = DashboardPropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [properties_repository_1.DashboardPropertiesRepository,
        units_service_1.DashboardUnitsService,
        images_service_1.DashboardImagesService])
], DashboardPropertiesService);
//# sourceMappingURL=properties.service.js.map