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
const PDFDocument = require('pdfkit-table');
const fs_1 = require("fs");
const typeorm_1 = require("typeorm");
const common_2 = require("../../../common");
const view_mapping_1 = require("./mappings/view.mapping");
const upsert_mapping_1 = require("./mappings/upsert.mapping");
const units_service_1 = require("../units/units.service");
const properties_repository_1 = require("./properties.repository");
let DashboardPropertiesService = class DashboardPropertiesService {
    constructor(repository, unitService) {
        this.repository = repository;
        this.unitService = unitService;
        this.rootPath = __dirname.replace('dist/modules/dashboard/properties', 'public/images');
    }
    async get(property_id) {
        const query = {
            where: {
                property_id,
            },
            relations: {
                units: true,
                images: true,
            },
        };
        const property = await this.repository.findOne(query);
        return property ? await (0, view_mapping_1.mapDbToResDetail)(property) : null;
    }
    async getList(props) {
        let query = {
            where: {},
            order: {
                created_at: 'desc',
            },
            relations: { units: true, images: true },
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
    async convertFromExcelToDb() {
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
    async generatePDFComparisson(property_id) {
        return new Promise(async (resolve) => {
            const kotakDialog = {
                date_availability: '',
                prepared_for: '',
                commencement_date: '',
                type: '',
                area: '',
                marketing: '',
                telp: '',
                mobile: '',
                email: '',
            };
            const query = {
                select: {
                    name: true,
                    location: true,
                    property_size: true,
                    total_floor: true,
                    price_overtime_ac: true,
                    price_overtime_electricity: true,
                    units: {
                        condition: true,
                    },
                    price_rent_sqm: true,
                    service_charge: true,
                },
                where: {
                    property_id: (0, typeorm_1.In)(property_id),
                },
                relations: {
                    units: true,
                },
            };
            const getData = await this.repository.find(query);
            const buffers = [];
            const doc = new PDFDocument({
                margin: 30,
                size: 'A4',
                layout: 'landscape',
            });
            const properties = getData.map((dt) => {
                const size = dt.property_size ?? 0;
                const priceRent = dt.price_rent_sqm ?? 0;
                const serviceCharge = dt.service_charge ?? 0;
                const costTotal = priceRent > 0 ? size * (priceRent + serviceCharge) : 0;
                const negoRent = priceRent > 0 ? priceRent - 10000 : 0;
                const totalCostBargain = negoRent > 0 ? size * (negoRent + serviceCharge) : 0;
                console.log('cost ');
                return {
                    name: dt.name,
                    location: dt.location,
                    property_size: size,
                    total_floor: dt.total_floor ?? 0,
                    price_overtime_ac: dt.price_overtime_ac ?? 0,
                    price_overtime_electricity: dt.price_overtime_electricity ?? 0,
                    condition: dt.units[0].condition ?? 'Bare',
                    price_rent_sqm: priceRent,
                    service_charge: serviceCharge,
                    cost_total: costTotal,
                    cost_total_max: costTotal > 0 ? 0.11 * costTotal + costTotal : 0,
                    nego_rent: negoRent,
                    total_cost_bargain: totalCostBargain,
                    bargain_tax: totalCostBargain > 0
                        ? totalCostBargain * 0.11 + totalCostBargain
                        : 0,
                };
            });
            const dataPerPage = 5;
            const page = Math.ceil(properties.length / dataPerPage);
            console.log('page', page);
            doc.image(this.rootPath + '/cover.png', {
                width: 700,
                align: 'center',
                valign: 'center',
            });
            for (let index = 0; index < page; index++) {
                let data;
                if (index === 0) {
                    data = properties.slice(index, dataPerPage);
                }
                else {
                    const start = index * dataPerPage;
                    const end = start * dataPerPage;
                    data = properties.slice(start, end);
                }
                doc.addPage();
                const header = [
                    {
                        label: 'Building',
                        property: 'building',
                        width: 120,
                        renderer: null,
                        headerColor: '#7f7f7f',
                        headerOpacity: 2,
                        headerAlign: 'center',
                        valign: 'middle',
                        options: { padding: 5 },
                    },
                ];
                const row1 = data.map((dt) => {
                    return dt.location;
                });
                const row2 = data.map((dt) => {
                    return dt.property_size;
                });
                const row3 = data.map((dt) => {
                    return dt.total_floor;
                });
                const row4 = data.map((dt) => {
                    return dt.price_overtime_ac;
                });
                const row5 = data.map((dt) => {
                    return dt.price_overtime_electricity;
                });
                const row6 = data.map((dt) => {
                    return dt['condition'];
                });
                const row7 = data.map((dt) => {
                    return 'Rp. ' + dt.price_rent_sqm;
                });
                const row8 = data.map((dt) => {
                    return 'Rp. ' + dt.service_charge;
                });
                const row9 = data.map((dt) => {
                    return 'Rp. ' + dt['cost_total'];
                });
                const row10 = data.map((dt) => {
                    return 'IDR ' + dt['cost_total_tax'];
                });
                const row11 = data.map((dt) => {
                    return 'Rp. ' + dt['nego_rent'];
                });
                const row12 = data.map((dt) => {
                    return 'Rp. ' + dt['total_cost_bargain'];
                });
                const row13 = data.map((dt) => {
                    return 'Rp. ' + dt['bargain_tax'];
                });
                for (const dt of data) {
                    header.push({
                        label: dt.name,
                        property: dt.name,
                        width: 120,
                        renderer: null,
                        headerColor: '#7f7f7f',
                        headerOpacity: 2,
                        headerAlign: 'center',
                        valign: 'middle',
                        options: { padding: 5 },
                    });
                }
                const rowAja = [
                    'Image',
                    'Location',
                    'Availablilty ( sqm )',
                    'Floor',
                    'AC',
                    'Electricity',
                    'Condition',
                    'Rental Rate',
                    'Service Charge',
                    'Cost Per month',
                    'Cost Per Month After Tax',
                    'MERGE CELL',
                    'Estimation For Negotiation Price',
                    'Rental',
                    'Service Charge',
                    'Total Cost Bargain',
                    'Bargain After Tax',
                ];
                const datas = [];
                console.log('hedaer', header.length);
                for (let index = 0; index < 16; index++) {
                    const data = {
                        building: rowAja[index],
                    };
                    if (header.length === 2) {
                    }
                    if (header.length === 3) {
                    }
                    if (header.length === 4) {
                        if (index == 1) {
                            Object.assign(data, {
                                [header[1].label]: row1[0],
                                [header[2].label]: row1[1],
                                [header[3].label]: row1[2],
                            });
                        }
                        else if (index == 2) {
                            Object.assign(data, {
                                [header[1].label]: row2[0],
                                [header[2].label]: row2[1],
                                [header[3].label]: row2[2],
                            });
                        }
                        else if (index == 3) {
                            Object.assign(data, {
                                [header[1].label]: row3[0],
                                [header[2].label]: row3[1],
                                [header[3].label]: row3[2],
                            });
                        }
                        else if (index == 4) {
                            Object.assign(data, {
                                [header[1].label]: row4[0],
                                [header[2].label]: row4[1],
                                [header[3].label]: row4[2],
                            });
                        }
                        else if (index == 5) {
                            Object.assign(data, {
                                [header[1].label]: row5[0],
                                [header[2].label]: row5[1],
                                [header[3].label]: row5[2],
                            });
                        }
                        else if (index == 6) {
                            Object.assign(data, {
                                [header[1].label]: row6[0],
                                [header[2].label]: row6[1],
                                [header[3].label]: row6[2],
                            });
                        }
                        else if (index == 7) {
                            Object.assign(data, {
                                [header[1].label]: row7[0],
                                [header[2].label]: row7[1],
                                [header[3].label]: row7[2],
                            });
                        }
                        else if (index == 8) {
                            Object.assign(data, {
                                [header[1].label]: row8[0],
                                [header[2].label]: row8[1],
                                [header[3].label]: row8[2],
                            });
                        }
                        else if (index == 9) {
                            Object.assign(data, {
                                [header[1].label]: row9[0],
                                [header[2].label]: row9[1],
                                [header[3].label]: row9[2],
                            });
                        }
                        else if (index == 10) {
                            Object.assign(data, {
                                [header[1].label]: row10[0],
                                [header[2].label]: row10[1],
                                [header[3].label]: row10[2],
                            });
                        }
                        else if (index == 11) {
                            Object.assign(data, {
                                [header[1].label]: row11[0],
                                [header[2].label]: row11[1],
                                [header[3].label]: row11[2],
                            });
                        }
                        else if (index == 12) {
                            Object.assign(data, {
                                [header[1].label]: row12[0],
                                [header[2].label]: row12[1],
                                [header[3].label]: row12[2],
                            });
                        }
                        else if (index === 13) {
                            Object.assign(data, {
                                [header[1].label]: row13[0],
                                [header[2].label]: row13[1],
                                [header[3].label]: row13[2],
                            });
                        }
                    }
                    if (header.length === 5) {
                        if (index == 1) {
                            Object.assign(data, {
                                [header[1].label]: row1[0],
                                [header[2].label]: row1[1],
                                [header[3].label]: row1[2],
                                [header[4].label]: row1[3],
                            });
                        }
                        else if (index == 2) {
                            Object.assign(data, {
                                [header[1].label]: row2[0],
                                [header[2].label]: row2[1],
                                [header[3].label]: row2[2],
                                [header[4].label]: row2[3],
                            });
                        }
                        else if (index == 3) {
                            Object.assign(data, {
                                [header[1].label]: row3[0],
                                [header[2].label]: row3[1],
                                [header[3].label]: row3[2],
                                [header[4].label]: row3[3],
                            });
                        }
                        else if (index == 4) {
                            Object.assign(data, {
                                [header[1].label]: row4[0],
                                [header[2].label]: row4[1],
                                [header[3].label]: row4[2],
                                [header[4].label]: row4[3],
                            });
                        }
                        else if (index == 5) {
                            Object.assign(data, {
                                [header[1].label]: row5[0],
                                [header[2].label]: row5[1],
                                [header[3].label]: row5[2],
                                [header[4].label]: row5[3],
                            });
                        }
                        else if (index == 6) {
                            Object.assign(data, {
                                [header[1].label]: row6[0],
                                [header[2].label]: row6[1],
                                [header[3].label]: row6[2],
                                [header[4].label]: row6[3],
                            });
                        }
                        else if (index == 7) {
                            Object.assign(data, {
                                [header[1].label]: row7[0],
                                [header[2].label]: row7[1],
                                [header[3].label]: row7[2],
                                [header[4].label]: row7[3],
                            });
                        }
                        else if (index == 8) {
                            Object.assign(data, {
                                [header[1].label]: row8[0],
                                [header[2].label]: row8[1],
                                [header[3].label]: row8[2],
                                [header[4].label]: row8[3],
                            });
                        }
                        else if (index == 9) {
                            Object.assign(data, {
                                [header[1].label]: row9[0],
                                [header[2].label]: row9[1],
                                [header[3].label]: row9[2],
                                [header[4].label]: row9[3],
                            });
                        }
                        else if (index == 10) {
                            Object.assign(data, {
                                [header[1].label]: row10[0],
                                [header[2].label]: row10[1],
                                [header[3].label]: row10[2],
                                [header[4].label]: row10[3],
                            });
                        }
                        else if (index == 11) {
                            Object.assign(data, {
                                [header[1].label]: row11[0],
                                [header[2].label]: row11[1],
                                [header[3].label]: row11[2],
                                [header[4].label]: row11[3],
                            });
                        }
                        else if (index == 12) {
                            Object.assign(data, {
                                [header[1].label]: row12[0],
                                [header[2].label]: row12[1],
                                [header[3].label]: row12[2],
                                [header[4].label]: row12[3],
                            });
                        }
                        else if (index == 13) {
                            Object.assign(data, {
                                [header[1].label]: row13[0],
                                [header[2].label]: row13[1],
                                [header[3].label]: row13[2],
                                [header[4].label]: row13[3],
                            });
                        }
                    }
                    if (header.length === 6) {
                        if (index == 1) {
                            Object.assign(data, {
                                [header[1].label]: row1[0],
                                [header[2].label]: row1[1],
                                [header[3].label]: row1[2],
                                [header[4].label]: row1[3],
                                [header[5].label]: row1[4],
                            });
                        }
                        else if (index == 2) {
                            Object.assign(data, {
                                [header[1].label]: row2[0],
                                [header[2].label]: row2[1],
                                [header[3].label]: row2[2],
                                [header[4].label]: row2[3],
                                [header[5].label]: row2[4],
                            });
                        }
                        else if (index == 3) {
                            Object.assign(data, {
                                [header[1].label]: row3[0],
                                [header[2].label]: row3[1],
                                [header[3].label]: row3[2],
                                [header[4].label]: row3[3],
                                [header[5].label]: row3[4],
                            });
                        }
                        else if (index == 4) {
                            Object.assign(data, {
                                [header[1].label]: row4[0],
                                [header[2].label]: row4[1],
                                [header[3].label]: row4[2],
                                [header[4].label]: row4[3],
                                [header[5].label]: row4[4],
                            });
                        }
                        else if (index == 5) {
                            Object.assign(data, {
                                [header[1].label]: row5[0],
                                [header[2].label]: row5[1],
                                [header[3].label]: row5[2],
                                [header[4].label]: row5[3],
                                [header[5].label]: row5[4],
                            });
                        }
                        else if (index == 6) {
                            Object.assign(data, {
                                [header[1].label]: row6[0],
                                [header[2].label]: row6[1],
                                [header[3].label]: row6[2],
                                [header[4].label]: row6[3],
                                [header[5].label]: row6[4],
                            });
                        }
                        else if (index == 7) {
                            Object.assign(data, {
                                [header[1].label]: row7[0],
                                [header[2].label]: row7[1],
                                [header[3].label]: row7[2],
                                [header[4].label]: row7[3],
                                [header[5].label]: row7[4],
                            });
                        }
                        else if (index == 8) {
                            Object.assign(data, {
                                [header[1].label]: row8[0],
                                [header[2].label]: row8[1],
                                [header[3].label]: row8[2],
                                [header[4].label]: row8[3],
                                [header[5].label]: row8[4],
                            });
                        }
                        else if (index == 9) {
                            Object.assign(data, {
                                [header[1].label]: row9[0],
                                [header[2].label]: row9[1],
                                [header[3].label]: row9[2],
                                [header[4].label]: row9[3],
                                [header[5].label]: row9[4],
                            });
                        }
                        else if (index == 10) {
                            Object.assign(data, {
                                [header[1].label]: row10[0],
                                [header[2].label]: row10[1],
                                [header[3].label]: row10[2],
                                [header[4].label]: row10[3],
                                [header[5].label]: row10[4],
                            });
                        }
                        else if (index == 11) {
                            Object.assign(data, {
                                [header[1].label]: row11[0],
                                [header[2].label]: row11[1],
                                [header[3].label]: row11[2],
                                [header[4].label]: row11[3],
                                [header[5].label]: row11[4],
                            });
                        }
                        else if (index == 12) {
                            Object.assign(data, {
                                [header[1].label]: row12[0],
                                [header[2].label]: row12[1],
                                [header[3].label]: row12[2],
                                [header[4].label]: row12[3],
                                [header[5].label]: row12[4],
                            });
                        }
                        else if (index == 13) {
                            Object.assign(data, {
                                [header[1].label]: row13[0],
                                [header[2].label]: row13[1],
                                [header[3].label]: row13[2],
                                [header[4].label]: row13[3],
                                [header[5].label]: row13[4],
                            });
                        }
                    }
                    datas.push(data);
                }
                console.log('data jadi', datas);
                const table = {
                    headers: header,
                    datas: datas,
                };
                doc.table(table, {
                    x: 50,
                    y: 80,
                    prepareHeader: () => {
                        doc
                            .font('Helvetica-Bold')
                            .fontSize(11)
                            .fillColor('white')
                            .lineGap(5);
                    },
                    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                        if (indexRow === 0 && indexColumn === 0) {
                            doc.addBackground(rectRow, '#bfbfbf', 0.5);
                        }
                        if (indexColumn === 0) {
                            doc.font('Times-Roman').fontSize(10).fillColor('black');
                            doc.addBackground(rectCell, '#bfbfbf', 1);
                        }
                    },
                });
            }
            doc.end();
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
        });
    }
    async generatePdf() {
        return new Promise((resolve) => {
            let doc = new PDFDocument({
                margin: 30,
                size: 'A4',
                layout: 'landscape',
            });
            const buffers = [];
            doc.image(this.rootPath + '/2.png', doc.page.width / 2 - 100, 150, {
                width: 200,
            });
            doc.addPage();
            const table = {
                title: 'Title',
                subtitle: 'Subtitle',
                headers: [
                    { label: 'Name', property: 'name', width: 60, renderer: null },
                    {
                        label: 'Description',
                        property: 'description',
                        width: 150,
                        renderer: null,
                    },
                    { label: 'Price 1', property: 'price1', width: 100, renderer: null },
                    { label: 'Price 2', property: 'price2', width: 100, renderer: null },
                    { label: 'Price 3', property: 'price3', width: 80, renderer: null },
                    {
                        label: 'Price 4',
                        property: 'price4',
                        width: 43,
                        renderer: (value, indexColumn, indexRow, row, rectRow, rectCell) => {
                            return `U$ ${Number(value).toFixed(2)}`;
                        },
                    },
                ],
                datas: [
                    {
                        name: 'Name 1',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ',
                        price1: '$1',
                        price3: '$ 3',
                        price2: '$2',
                        price4: '4',
                    },
                    {
                        options: { fontSize: 10, separation: true },
                        name: 'bold:Name 2',
                        description: 'bold:Lorem ipsum dolor.',
                        price1: 'bold:$1',
                        price3: {
                            label: 'PRICE $3',
                            options: { fontSize: 12 },
                        },
                        price2: '$2',
                        price4: '4',
                    },
                ],
                rows: [
                    [
                        'Apple',
                        'Nullam ut facilisis mi. Nunc dignissim ex ac vulputate facilisis.',
                        '$ 105,99',
                        '$ 105,99',
                        '$ 105,99',
                        '105.99',
                    ],
                ],
            };
            doc.table(table, {
                prepareHeader: () => doc.font('Helvetica-Bold').fontSize(8),
                prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                    doc.font('Helvetica').fontSize(8);
                    indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
                },
            });
            doc.end();
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
        });
    }
    generateDummyData(rowCount) {
        const chunks = [];
        for (let i = 0; i < rowCount; i++) {
            const row = {
                fillColor: i % 2 === 0 ? '#e0e0e0' : '#f5f5f5',
                cells: Array(24)
                    .fill(0)
                    .map((_, idx) => {
                    if (idx === 3) {
                        return {
                            image: this.rootPath + '/1.png',
                            width: 20,
                            height: 20,
                        };
                    }
                    return `Baris ${i + 1}-Kolom ${idx + 1}`;
                }),
            };
            chunks.push(row);
        }
        return chunks.reduce((result, item, index) => {
            const chunkIndex = Math.floor(index / 5);
            if (!result[chunkIndex])
                result[chunkIndex] = [];
            result[chunkIndex].push(item);
            return result;
        }, []);
    }
    async generateVerticalHeaderPdf() {
        return new Promise((resolve) => {
            const doc = new PDFDocument({
                margin: 30,
                size: 'A4',
                layout: 'landscape',
            });
            const buffers = [];
            const data = this.generateSampleData();
            const table = {
                title: 'Laporan dengan Header Vertikal',
                subtitle: 'Periode Januari 2024',
                rows: this.formatVerticalHeaders(data),
                options: {
                    columnsSize: [
                        100,
                        ...Array(7).fill((doc.page.width - 100 - 60) / 7),
                    ],
                    padding: 8,
                    divider: {
                        horizontal: { width: 0.5, color: '#E0E0E0' },
                    },
                    headerStyles: {
                        fillColor: 'transparent',
                    },
                    rowHeight: 40,
                },
            };
            const startX = (doc.page.width - (doc.page.width - 60)) / 2;
            doc.y = 100;
            doc.table(table, {
                x: startX,
                prepareRow: (row, rowIndex) => {
                    row.cells[0].styles = {
                        fillColor: '#607D8B',
                        textColor: '#000',
                        bold: true,
                        fontSize: 10,
                        textRotation: 90,
                        verticalAlign: 'center',
                    };
                    row.cells.slice(1).forEach((cell) => {
                        cell.styles = {
                            fontSize: 9,
                            textColor: '#424242',
                            alignment: 'center',
                        };
                    });
                },
            });
            doc.end();
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
        });
    }
    generateSampleData() {
        return [
            { header: 'Produk A', data: [150, 75, 230, 45, 890, 120, 340] },
            { header: 'Produk B', data: [95, 230, 145, 670, 320, 510, 210] },
            { header: 'Produk C', data: [320, 450, 275, 190, 550, 430, 380] },
            { header: 'Produk D', data: [180, 290, 380, 540, 260, 170, 490] },
            { header: 'Produk E', data: [410, 130, 590, 280, 370, 240, 520] },
        ];
    }
    formatVerticalHeaders(data) {
        return data.map((item) => ({
            cells: [
                {
                    text: item.header,
                    options: {
                        padding: [5, 10, 5, 10],
                    },
                },
                ...item.data.map((value, index) => ({
                    text: this.formatCellValue(value, index),
                    options: {
                        cellWidth: index === 3 ? 'auto' : undefined,
                    },
                })),
            ],
        }));
    }
    formatCellValue(value, index) {
        return index === 0
            ? `Rp ${value.toLocaleString()}`
            : index === 3
                ? `${value} unit`
                : value.toString();
    }
};
exports.DashboardPropertiesService = DashboardPropertiesService;
exports.DashboardPropertiesService = DashboardPropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [properties_repository_1.DashboardPropertiesRepository,
        units_service_1.DashboardUnitsService])
], DashboardPropertiesService);
//# sourceMappingURL=properties.service.js.map