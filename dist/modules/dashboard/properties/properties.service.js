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
const jsPDF = require('jspdf').jsPDF;
require("jspdf-autotable");
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
                    images: {
                        name: true,
                        path: true,
                    },
                    price_rent_sqm: true,
                    service_charge: true,
                },
                where: {
                    property_id: (0, typeorm_1.In)(property_id),
                },
                relations: {
                    units: true,
                    images: true,
                },
            };
            const getData = await this.repository.find(query);
            const buffers = [];
            const doc = new PDFDocument({
                margin: 30,
                width: 300,
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
                return {
                    name: dt.name,
                    image: dt.images[0].path + '/' + dt.images[0].name,
                    location: dt.location,
                    property_size: size,
                    total_floor: dt.total_floor ?? 0,
                    price_overtime_ac: dt.price_overtime_ac ?? 0,
                    price_overtime_electricity: dt.price_overtime_electricity ?? 0,
                    condition: dt.units[0].condition ?? 'Bare',
                    price_rent_sqm: priceRent,
                    service_charge: serviceCharge,
                    cost_total: costTotal,
                    cost_total_tax: costTotal > 0 ? 0.11 * costTotal + costTotal : 0,
                    nego_rent: negoRent,
                    total_cost_bargain: totalCostBargain,
                    bargain_tax: totalCostBargain > 0
                        ? totalCostBargain * 0.11 + totalCostBargain
                        : 0,
                };
            });
            const dataPerPage = 5;
            const page = Math.ceil(properties.length / dataPerPage);
            const coverImageWidth = 750;
            const coverImageHeight = 500;
            const coverImageX = (doc.page.width - coverImageWidth) / 2;
            const coverImageY = (doc.page.height - coverImageHeight) / 2;
            doc.image(this.rootPath + '/cover.png', coverImageX, coverImageY, {
                width: coverImageWidth,
                height: coverImageHeight,
            });
            for (let iTable = 0; iTable < page; iTable++) {
                doc.addPage();
                const headerImageX = doc.page.width - doc.page.margins.right - 150;
                const headerImageY = 20;
                doc.image(this.rootPath + '/logo-new.png', headerImageX, headerImageY, {
                    width: 80,
                    height: 40,
                });
                let databuilding;
                if (iTable === 0) {
                    databuilding = properties.slice(iTable, dataPerPage);
                }
                else {
                    const start = iTable * dataPerPage;
                    const end = start * dataPerPage;
                    databuilding = properties.slice(start, end);
                }
                const headers = [
                    {
                        label: 'Building',
                        property: 'building',
                        width: 110,
                        headerColor: '#7f7f7f',
                        headerOpacity: 2,
                        headerAlign: 'center',
                        valign: 'center',
                        options: { padding: 50 },
                        renderer: (value, indexColumn, indexRow, row, rectRow, rectCell) => {
                            if (indexRow === 0) {
                                console.log('asas', rectCell.height);
                                const imgWidth = rectCell.width;
                                const imgHeight = rectCell.height;
                                const xPos = rectCell.x + (rectCell.width - imgWidth) / 2;
                                const yPos = rectCell.y + (rectCell.height - imgHeight) / 2;
                                doc.image(this.rootPath + '/logo-jap.png', xPos, yPos, {
                                    width: rectCell.width,
                                    height: rectCell.height,
                                });
                            }
                            else {
                                return value;
                            }
                        },
                    },
                ];
                for (const dt of databuilding) {
                    headers.push({
                        label: dt.name,
                        property: dt.name,
                        width: 120,
                        headerColor: '#7f7f7f',
                        headerOpacity: 2,
                        headerAlign: 'center',
                        valign: 'center',
                        options: { padding: 50 },
                        renderer: (value, indexColumn, indexRow, row, rectRow, rectCell) => {
                            if (indexRow === 0) {
                                const imgWidth = rectCell.width;
                                const imgHeight = rectCell.height;
                                const xPos = rectCell.x + (rectCell.width - imgWidth) / 2;
                                const yPos = rectCell.y + (rectCell.height - imgHeight) / 2;
                                doc.image(value, xPos, yPos, {
                                    width: imgWidth,
                                    height: imgHeight,
                                });
                            }
                            else {
                                const cellHeight = rectCell.height;
                                const textHeight = doc.heightOfString(value, {
                                    width: rectCell.width,
                                });
                                let yOffset = 0;
                                if (row.valign === 'center') {
                                    yOffset = (cellHeight - textHeight) / 2;
                                }
                                else if (row.valign === 'bottom') {
                                    yOffset = cellHeight - textHeight;
                                }
                                if (indexRow >= 1 && indexRow <= 6) {
                                    doc.text(value, rectCell.x, rectCell.y + yOffset, {
                                        width: rectCell.width,
                                        align: row.align,
                                    });
                                }
                                else {
                                    if (indexRow !== 12) {
                                        doc.text(value, rectCell.x, rectCell.y + yOffset, {
                                            width: rectCell.width - 10,
                                            align: 'right',
                                        });
                                    }
                                }
                                return '';
                            }
                        },
                    });
                }
                const rowCell1 = [
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry,s standard dummy text ever since the 1500s',
                    'bold:Location',
                    'bold:Availablilty ( sqm )',
                    'bold:Floor',
                    'bold:AC',
                    'bold:Electricity',
                    'bold:Condition',
                    'bold:Rental Rate',
                    'bold:Service Charge',
                    'bold:Cost Per month',
                    'bold:Cost Per Month After Tax',
                    'MERGE CELL',
                    'bold:Estimation For Negotiation Price',
                    'bold:Rental',
                    'bold:Service Charge',
                    'bold:Total Cost Bargain',
                    'bold:Bargain After Tax',
                ];
                const datas = [];
                const row2 = databuilding.map((dt) => {
                    return dt['image'];
                });
                const row3 = databuilding.map((dt) => {
                    return dt.location;
                });
                const row4 = databuilding.map((dt) => {
                    return dt.property_size;
                });
                const row5 = databuilding.map((dt) => {
                    return dt.total_floor;
                });
                const row6 = databuilding.map((dt) => {
                    return dt.price_overtime_ac;
                });
                const row7 = databuilding.map((dt) => {
                    return dt.price_overtime_electricity;
                });
                const row8 = databuilding.map((dt) => {
                    return dt['condition'];
                });
                const row9 = databuilding.map((dt) => {
                    return 'Rp.   ' + dt.price_rent_sqm;
                });
                const row10 = databuilding.map((dt) => {
                    return 'Rp.   ' + dt.service_charge;
                });
                const row11 = databuilding.map((dt) => {
                    return 'Rp.   ' + dt['cost_total'];
                });
                const row12 = databuilding.map((dt) => {
                    return 'bold:Rp.   ' + dt['cost_total_tax'];
                });
                const row13 = 'merge row';
                const row14 = '';
                const row15 = databuilding.map((dt) => {
                    return 'Rp.   ' + dt['nego_rent'];
                });
                const row16 = databuilding.map((dt) => {
                    return 'Rp.   ' + dt.service_charge;
                });
                const row17 = databuilding.map((dt) => {
                    return 'Rp.   ' + dt['total_cost_bargain'];
                });
                const row18 = databuilding.map((dt) => {
                    return 'bold:Rp.   ' + dt['bargain_tax'];
                });
                const rows = [
                    row2,
                    row3,
                    row4,
                    row5,
                    row6,
                    row7,
                    row8,
                    row9,
                    row10,
                    row11,
                    row12,
                    row13,
                    row14,
                    row15,
                    row16,
                    row17,
                    row18,
                ];
                let textPositionYEstimateNego = 390;
                for (let iRow = 0; iRow < 17; iRow++) {
                    const data = {
                        building: {
                            label: rowCell1[iRow],
                        },
                        align: 'center',
                        valign: 'center',
                    };
                    for (const [iHeader, header] of headers.entries()) {
                        if (iHeader !== 0) {
                            if (iRow === 4 || iRow === 5) {
                                console.log('asasas', rows[iRow][iHeader - 1].length);
                                if (rows[iRow][iHeader - 1].length > 25) {
                                    textPositionYEstimateNego = 400;
                                }
                            }
                            if (iRow === 10) {
                                Object.assign(data, {
                                    [header.property]: rows[iRow][iHeader - 1],
                                    options: {
                                        backgroundColor: '#ff0066',
                                        backgroundOpacity: 1,
                                    },
                                });
                            }
                            else if (iRow === 16) {
                                Object.assign(data, {
                                    [header.property]: rows[iRow][iHeader - 1],
                                    options: {
                                        backgroundColor: '#1f497d',
                                        backgroundOpacity: 1,
                                    },
                                });
                            }
                            else {
                                Object.assign(data, {
                                    [header.property]: rows[iRow][iHeader - 1],
                                    options: {
                                        backgroundColor: '#d2dce4',
                                        backgroundOpacity: 1,
                                    },
                                });
                            }
                        }
                    }
                    datas.push(data);
                }
                const table = {
                    headers: headers,
                    datas: datas,
                };
                doc.table(table, {
                    x: 60,
                    y: 60,
                    padding: [20, 5, 20, 5],
                    prepareHeader: () => {
                        doc.font('Helvetica-Bold').fontSize(10).fillColor('white');
                    },
                    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
                        const startX = 50;
                        const startY = 56;
                        let x = startX;
                        for (let index = 0; index < headers.length - 1; index++) {
                            x += 120;
                            doc
                                .moveTo(x, startY)
                                .lineTo(x, 380)
                                .lineWidth(0.8)
                                .strokeColor('white')
                                .stroke();
                        }
                        doc.font('Helvetica').fontSize(9).fillColor('black');
                        if (indexColumn === 0 &&
                            indexRow !== 0 &&
                            indexRow !== 10 &&
                            indexRow !== 16) {
                            doc.addBackground(rectCell, 'bfbfbf', 0);
                        }
                        if (indexRow === 10) {
                            doc.font('Helvetica').fillColor('white');
                            if (indexColumn === 0) {
                                doc.fontSize(8);
                            }
                        }
                        if (indexRow === 11) {
                            doc.addBackground(rectRow, '#fff', 1);
                        }
                        if (indexRow === 12) {
                            doc.addBackground(rectRow, '#7f7f7f', 1);
                        }
                        if (indexRow === 16) {
                            doc.font('Helvetica').fontSize(9).fillColor('white');
                        }
                    },
                    divider: {
                        header: { width: 1, opacity: 1, color: 'white' },
                        horizontal: {
                            width: 1,
                            opacity: 1,
                            color: 'white',
                        },
                    },
                });
                const imageFooterX = (doc.page.width - 720) / 2;
                const imageFooterY = doc.page.height - doc.page.margins.bottom - 70;
                doc.image(this.rootPath + '/footer.png', imageFooterX, imageFooterY, {
                    width: 700,
                    height: 70,
                });
                const lengthHeaders = headers.length;
                const positionX = lengthHeaders == 6
                    ? 300
                    : lengthHeaders == 5
                        ? 240
                        : lengthHeaders == 4
                            ? 170
                            : 100;
                doc
                    .font('Helvetica-Bold')
                    .fontSize(15)
                    .fillColor('white')
                    .text('Estimation For Negotiation Price', positionX, textPositionYEstimateNego);
            }
            doc.addPage();
            const coverBackImageWidth = 800;
            const coverBackImageHeight = 600;
            const coverBackImageX = (doc.page.width - 820) / 2;
            const coverBackImageY = (doc.page.height - coverBackImageHeight) / 2;
            doc.image(this.rootPath + '/cover-back.png', coverBackImageX, coverBackImageY, {
                width: coverBackImageWidth,
                height: coverBackImageHeight,
            });
            doc.end();
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
        });
    }
};
exports.DashboardPropertiesService = DashboardPropertiesService;
exports.DashboardPropertiesService = DashboardPropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [properties_repository_1.DashboardPropertiesRepository,
        units_service_1.DashboardUnitsService])
], DashboardPropertiesService);
//# sourceMappingURL=properties.service.js.map