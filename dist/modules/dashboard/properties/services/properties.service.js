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
            relations: { units: true },
        };
        query = await this.repository.sort(query, props);
        query = await this.repository.paginate(query, props);
        if (props.amenities) {
            Object.assign(query.where, { amenities: (0, typeorm_1.Like)(`%${props.amenities}%`) });
        }
        if (props.location) {
            Object.assign(query.where, { location: props.location.toLowerCase() });
        }
        if (props.property_type) {
            Object.assign(query.where, { property_type: props.property_type });
        }
        if (props.property_status) {
        }
        if (props.search_keyword) {
            Object.assign(query.where, { name: (0, typeorm_1.Like)(`%${props.search_keyword}%`) });
        }
        const search = await this.repository.findAndCount(query);
        const properties = search[0].length > 0 ? await (0, view_mapping_1.mapDbToResList)(search[0]) : [];
        return { data: properties, count: search[1] };
    }
    async create(body, admin) {
        const mapProperty = await (0, upsert_mapping_1.mapReqCreateToDb)(body, admin);
        const saveData = await this.repository.save(mapProperty);
        body['property_id'] = saveData.property_id;
        return body;
    }
    async update(body, admin) {
        console.log('update', body);
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
        const monthAgo = (0, common_2.dayjs)().subtract(1, 'month').format('YYYY-MM-DD');
        const properties = await this.repository.find({
            select: {
                property_id: true,
                name: true,
                slug: true,
                updated_at: true,
            },
            where: {
                updated_at: (0, typeorm_1.LessThanOrEqual)(monthAgo),
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
        const dirExcel = dirName.replace('/dist/modules/dashboard', '/spread.xlsx');
        const excelData = (0, fs_1.readFileSync)(dirExcel);
        const workbook = XLSX.read(excelData.buffer, {
            type: 'buffer',
        });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        let key = 0;
        let propertyId = 0;
        const arr = [];
        console.log('sini', jsonData);
        for (const dt of jsonData) {
            console.log('dt', dt);
            if (dt.no && typeof dt.no === 'number') {
                key = dt.no;
                const property = {
                    name: dt.nama_gedung,
                    popular: 0,
                    description: dt.description ?? '',
                    address: dt.address ?? '',
                    location: common_2.LocationEnum.THAMRIN,
                    koordinat_map: dt.koordinat_map ?? dt.address ?? dt.building,
                    property_type: common_2.PropertyTypeEnum.OFFICE,
                    completion: dt.completion,
                    status_publish: common_2.StatusPublishEnum.PUBLISH,
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
                const insertProperty = await this.create(property, null);
                propertyId = insertProperty.property_id;
                const unit = {
                    property_id: propertyId,
                    size: dt.unit_size
                        ? typeof dt.unit_size === 'string'
                            ? Number(dt.unit_size.toString().replace(/,/g, ''))
                            : 0
                        : 0,
                    floor: dt.unit_floor,
                    condition: dt.unit_condition
                        ? Object.values(dt.unit_condition).includes(common_2.ConditionUnitEnum)
                            ? dt.unit_condition
                            : common_2.ConditionUnitEnum.BARE
                        : common_2.ConditionUnitEnum.BARE,
                    rent_sqm: dt.unit_rent,
                    available: true,
                    pic_name: dt.pic_name,
                    pic_phone: dt.pic_phone,
                    status: common_2.PropertyStatusEnum.LEASE,
                };
                await this.unitService.create(unit, null);
                arr.push(property);
            }
            else {
                const unit = {
                    property_id: propertyId,
                    size: dt.unit_size
                        ? Number(dt.unit_size.toString().replace(/,/g, ''))
                        : 0,
                    floor: dt.unit_floor,
                    condition: dt.unit_condition
                        ? Object.values(dt.unit_condition).includes(common_2.ConditionUnitEnum)
                            ? dt.unit_condition
                            : common_2.ConditionUnitEnum.BARE
                        : common_2.ConditionUnitEnum.BARE,
                    available: true,
                    rent_sqm: dt.unit_rent,
                    pic_name: dt.pic_name,
                    pic_phone: dt.pic_phone,
                    status: common_2.PropertyStatusEnum.LEASE,
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