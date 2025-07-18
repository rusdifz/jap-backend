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
            Object.assign(query.where, { units: { status: props.property_status } });
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
                units: { rent_price: (0, typeorm_1.Between)(props.min_rent_sqm, props.max_rent_sqm) },
            });
        }
        const search = await this.repository.findAndCount(query);
        const properties = search[0].length > 0 ? await (0, view_mapping_1.mapDbToResList)(search[0]) : [];
        return { data: properties, count: search[1] };
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
        body['slug'] = saveData.slug;
        return body;
    }
    async update(body, admin) {
        const mapProperty = await (0, upsert_mapping_1.mapReqUpdateToDB)(body, admin);
        body['slug'] = mapProperty.slug;
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
    async updateThumbnail(id, thumbnail_url) {
        return await this.repository.update({ property_id: id }, { thumbnail: thumbnail_url });
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
        console.log('work', workbook.SheetNames);
        const arr = [];
        for (const sheetName of workbook.SheetNames) {
            if (sheetName == common_2.LocationEnum.SURABAYA) {
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                let key = 0;
                let propertyId = 0;
                for (const dt of jsonData) {
                    if (dt.no && typeof dt.no === 'number') {
                        console.log('dt', dt);
                        key = dt.no;
                        const description = dt.description
                            ? dt.description.trim()
                            : dt.nama_gedung +
                                ' adalah gedung perkantoran dengan lokasi yang strategis, akses mudah, serta kapasitas parkir yang luas. Gedung ini memiliki luas bangunan sekitar 25.386 meter persegi dan total 30 lantai, serta dilengkapi fasilitas gedung mulai dari 7 lift dalam dua zona (low zone dan high zone), 1 service lift, kantin, ATM, bank, parkir untuk total sekitar  1000 unit kendaraan, keamanan selama 24 jam, system back-up power dan internet berkecepatan tinggi. Wisma Nusantara adalah gedung grade B yang lokasinya berada di jalan M.H. Thamrin No. 59 Jakarta Pusat. Gedung ini berdekatan dengan jalan Sudirman, tanah abang, menteng. Sarana transportasi umum  mudah didapatkan di area gedung ini mulai dari bus kota (Metro Mini, Mayasari Bakti, PPD, Agung Bhakti, dan Kopaja), TransJakarta , taksi, transportasi online, stasiun KRL sudirman dan MRT.';
                        let rentPriceAverage = 0;
                        if (dt.rent_price) {
                            rentPriceAverage = isNaN(Number(dt.rent_price.toString().replace(/,/g, '')))
                                ? 0
                                : Number(dt.rent_price.toString().replace(/,/g, ''));
                        }
                        const property = {
                            name: dt.nama_gedung.trim(),
                            popular: 0,
                            description: description,
                            url_youtube: '',
                            address: dt.address ? dt.address.trim() : '',
                            location: sheetName,
                            koordinat_map: dt.koordinat_map
                                ? dt.koordinat_map.trim()
                                : dt.address
                                    ? dt.address.trim()
                                    : dt.nama_gedung.trim(),
                            property_type: dt[' property_type']
                                ? dt[' property_type'].trim()
                                : common_2.PropertyTypeEnum.OFFICE,
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
                                ground_floor: dt.ground_floor ?? 0,
                                rent_average: rentPriceAverage,
                                overtime: {
                                    electricity: dt.overtime_electric
                                        ? typeof dt.overtime_electric === 'string'
                                            ? dt.overtime_electric.trim()
                                            : dt.overtime_electric
                                        : 'tba',
                                    lighting: dt.overtime_lighting
                                        ? typeof dt.overtime_lighting === 'string'
                                            ? dt.overtime_lighting.trim()
                                            : dt.overtime_lighting
                                        : 'tba',
                                    ac: dt.overtime_ac
                                        ? typeof dt.overtime_ac === 'string'
                                            ? dt.overtime_ac.trim()
                                            : dt.overtime_ac
                                        : 'tba',
                                },
                                service_charge: {
                                    price: dt.service_charge_price
                                        ? typeof dt.service_charge_price === 'string'
                                            ? dt.service_charge_price.replace(/\D/g, '')
                                            : dt.service_charge_price.trim()
                                        : 0,
                                    info: dt.service_charge_info,
                                },
                                parking_charge: {
                                    reserved: {
                                        car: dt?.reserved_car,
                                        motorcycle: dt?.reserved_motor
                                            ? dt.reserved_motor.trim()
                                            : 'tba',
                                    },
                                    unreserved: {
                                        car: dt?.unreserved_car,
                                        motorcycle: dt?.unreserved_motor
                                            ? dt.unreserved_motor.trim()
                                            : 'tba',
                                    },
                                },
                            },
                            spesification: {
                                property_size: dt[' total_size '],
                                office_hours_weekday: dt.office_hours_weekdays,
                                office_hours_weekend: dt.office_hours_weekend,
                                total_floor: dt.floor_total
                                    ? typeof dt.floor_total === 'string'
                                        ? dt.floor_total === 'tba'
                                        : 0
                                    : dt.floor_total,
                                size_floor: dt[' floor_size '],
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
                        let scPrice = 0;
                        let rentPrice = 0;
                        if (dt.unit_size) {
                            unitSize = isNaN(Number(dt.unit_size.toString().replace(/,/g, '')))
                                ? 0
                                : Number(dt.unit_size.toString().replace(/,/g, ''));
                        }
                        if (dt.rent_price) {
                            rentPrice = isNaN(Number(dt.rent_price.toString().replace(/,/g, '')))
                                ? 0
                                : Number(dt.rent_price.toString().replace(/,/g, ''));
                        }
                        if (dt.service_charge_price) {
                            scPrice = isNaN(Number(dt.service_charge_price.toString().replace(/,/g, '')))
                                ? 0
                                : Number(dt.service_charge_price.toString().replace(/,/g, ''));
                        }
                        const unit = {
                            property_id: propertyId,
                            size: unitSize.toString(),
                            floor: dt.unit_floor,
                            condition: dt.unit_condition
                                ? Object.values(dt.unit_condition).includes(common_2.ConditionUnitEnum)
                                    ? dt.unit_condition
                                    : common_2.ConditionUnitEnum.BARE
                                : common_2.ConditionUnitEnum.BARE,
                            rent_price: rentPrice,
                            available: true,
                            pic_name: dt.pic_name,
                            pic_phone: dt.phone_pic,
                            status: common_2.PropertyStatusEnum.LEASE,
                        };
                        await this.unitService.create(unit, null);
                        arr.push(property);
                    }
                    else {
                        let unitSize = 0;
                        let scPrice = 0;
                        let rentPrice = 0;
                        if (dt.unit_size) {
                            unitSize = isNaN(Number(dt.unit_size.toString().replace(/,/g, '')))
                                ? 0
                                : Number(dt.unit_size.toString().replace(/,/g, ''));
                        }
                        if (dt.rent_price) {
                            rentPrice = isNaN(Number(dt.rent_price.toString().replace(/,/g, '')))
                                ? 0
                                : Number(dt.rent_price.toString().replace(/,/g, ''));
                        }
                        if (dt.service_charge_price) {
                            scPrice = isNaN(Number(dt.service_charge_price.toString().replace(/,/g, '')))
                                ? 0
                                : Number(dt.service_charge_price.toString().replace(/,/g, ''));
                        }
                        const unit = {
                            property_id: propertyId,
                            size: unitSize.toString(),
                            floor: dt.unit_floor ?? '',
                            condition: dt.unit_condition
                                ? Object.values(dt.unit_condition).includes(common_2.ConditionUnitEnum)
                                    ? dt.unit_condition
                                    : common_2.ConditionUnitEnum.BARE
                                : common_2.ConditionUnitEnum.BARE,
                            available: true,
                            rent_price: rentPrice,
                            pic_name: dt.pic_name,
                            pic_phone: dt.phone_pic,
                            status: common_2.PropertyStatusEnum.LEASE,
                        };
                        await this.unitService.create(unit, null);
                    }
                }
            }
        }
        return arr;
    }
    async inputImageBulkByLocation(location, type) {
        const query = {
            select: {
                property_id: true,
                slug: true,
                location: true,
            },
            where: {
                location,
            },
        };
        const properties = await this.getListCustom(query);
        let resp = [];
        if (properties.length > 0) {
            resp = await this.imageService.uploadImageBulk(properties, type);
        }
        return resp;
    }
    async inputImageBulkThumbnailByLocation(location) {
        const query = {
            select: {
                property_id: true,
                name: true,
                location: true,
            },
            where: {
                location,
                property_id: (0, typeorm_1.Not)((0, typeorm_1.In)([87, 88, 89, 90, 91, 92, 93, 94, 95, 96])),
            },
        };
        const properties = await this.getListCustom(query);
        let resp = [];
        if (properties.length > 0) {
            resp = await this.imageService.uploadImageThumbnailBulk(properties);
            console.log('res', resp);
            if (resp.length > 0) {
                resp.forEach((dt) => {
                    this.updateThumbnail(dt.reference_id, dt.full_url);
                });
            }
        }
        return resp;
    }
    async editBulkFromExcel() {
        const dirName = __dirname;
        const dirExcel = dirName.replace('/dist/modules/dashboard/properties/services', '/spread.xlsx');
        const excelData = (0, fs_1.readFileSync)(dirExcel);
        const workbook = XLSX.read(excelData.buffer, {
            type: 'buffer',
        });
        console.log('work', workbook.SheetNames);
        const arr = [];
        for (const sheetName of workbook.SheetNames) {
            if (sheetName == 'Thamrin' ||
                sheetName == 'Mega Kuningan' ||
                sheetName == 'scbd') {
                console.log('sheet name', sheetName);
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                let key = 0;
                let propertyName = '';
                let propertyId = 0;
                for (const dt of jsonData) {
                    if (dt.no && typeof dt.no === 'number') {
                        key = dt.no;
                        propertyName = dt.nama_gedung;
                    }
                    console.log('property name', propertyName);
                    if (propertyName !== '') {
                        console.log('property ini ada datanya');
                        let unitSize = 0;
                        let rentPrice = 0;
                        if (dt.unit_size) {
                            unitSize = isNaN(Number(dt.unit_size.toString().replace(/,/g, '')))
                                ? 0
                                : Number(dt.unit_size.toString().replace(/,/g, ''));
                        }
                        if (dt.rent_price) {
                            rentPrice = isNaN(Number(dt.rent_price.toString().replace(/,/g, '')))
                                ? 0
                                : Number(dt.rent_price.toString().replace(/,/g, ''));
                        }
                        const getPropertyId = await this.repository.findOneBy({
                            name: propertyName.trim(),
                        });
                        if (getPropertyId) {
                            propertyId = getPropertyId.property_id ?? 0;
                            const unit = {
                                property_id: propertyId,
                                size: unitSize.toString(),
                                floor: dt.unit_floor,
                                condition: dt.unit_condition
                                    ? Object.values(common_2.ConditionUnitEnum).includes(dt.unit_condition)
                                        ? dt.unit_condition
                                        : common_2.ConditionUnitEnum.BARE
                                    : common_2.ConditionUnitEnum.BARE,
                                rent_price: rentPrice,
                                available: true,
                                pic_name: dt.pic_name,
                                pic_phone: dt.pic_phone,
                                status: common_2.PropertyStatusEnum.LEASE,
                            };
                            console.log('data unit', unit);
                            await this.unitService.create(unit, null);
                        }
                    }
                }
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