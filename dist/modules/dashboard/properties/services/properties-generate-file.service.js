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
exports.DashboardPropertiesGenerateFileService = void 0;
const common_1 = require("@nestjs/common");
const PDFDocument = require('pdfkit-table');
const PDFDocumentHolland = require('@hollandjake/pdfkit-table');
const axios_1 = require("axios");
const fs_1 = require("fs");
const typeorm_1 = require("typeorm");
const properties_repository_1 = require("../properties.repository");
const currency_helper_1 = require("../../../../common/helpers/currency.helper");
const units_service_1 = require("../../units/units.service");
let DashboardPropertiesGenerateFileService = class DashboardPropertiesGenerateFileService {
    constructor(repository, unitService) {
        this.repository = repository;
        this.unitService = unitService;
        this.rootPathImageJAP = __dirname.replace('dist/modules/dashboard/properties/services', 'public/images/main');
    }
    async generatePDFComparisson(property_id, admin) {
        return new Promise(async (resolve, reject) => {
            try {
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
                            public_id: true,
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
                console.log('data', getData);
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
                        image: dt.images.length > 0
                            ? dt.images[0].path + '/' + dt.images[0].public_id
                            : '',
                        location: dt.location,
                        property_size: size,
                        total_floor: dt.total_floor ?? 0,
                        price_overtime_ac: dt.price_overtime_ac
                            ? dt.price_overtime_ac.length > 42
                                ? dt.price_overtime_ac.toString().substring(0, 42)
                                : dt.price_overtime_ac
                            : 0,
                        price_overtime_electricity: dt.price_overtime_electricity ?? 0,
                        condition: dt.units[0].condition ?? 'Bare',
                        price_rent_sqm: (0, currency_helper_1.formatCurrency)(priceRent),
                        service_charge: (0, currency_helper_1.formatCurrency)(serviceCharge),
                        cost_total: (0, currency_helper_1.formatCurrency)(costTotal),
                        cost_total_tax: costTotal > 0
                            ? (0, currency_helper_1.formatCurrency)(0.11 * costTotal + costTotal)
                            : (0, currency_helper_1.formatCurrency)(0),
                        nego_rent: (0, currency_helper_1.formatCurrency)(negoRent),
                        total_cost_bargain: (0, currency_helper_1.formatCurrency)(totalCostBargain),
                        bargain_tax: totalCostBargain > 0
                            ? (0, currency_helper_1.formatCurrency)(totalCostBargain * 0.11 + totalCostBargain)
                            : (0, currency_helper_1.formatCurrency)(0),
                    };
                });
                const dataPerPage = 5;
                const page = Math.ceil(properties.length / dataPerPage);
                const coverImageWidth = 750;
                const coverImageHeight = 500;
                const coverImageX = (doc.page.width - coverImageWidth) / 2;
                const coverImageY = (doc.page.height - coverImageHeight) / 2;
                doc.image(this.rootPathImageJAP + '/cover.png', coverImageX, coverImageY, {
                    width: coverImageWidth,
                    height: coverImageHeight,
                });
                doc.image(this.rootPathImageJAP + '/white.jpg', 575, 450, {
                    width: 200,
                    height: 150,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(6)
                    .fillColor('#000000')
                    .text('PT. Jardine Asia Pasific', 580, 450, {
                    align: 'left',
                    width: 150,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(6)
                    .fillColor('#000000')
                    .text('World Trade Centre, WTC 5, Lt. 11,', 580, 460, {
                    align: 'left',
                    width: 150,
                });
                doc
                    .text('Jl. Jend Sudirman Kav. 29-31, Kel. Karet, Setiabudi, Jakarta Selatan -', 580, 470, {
                    align: 'left',
                    width: 300,
                })
                    .font('Helvetica-Bold')
                    .fontSize(6)
                    .fillColor('#000000');
                doc
                    .text('DKl Jakarta, 12920', 580, 480, {
                    align: 'left',
                    width: 300,
                })
                    .font('Helvetica-Bold')
                    .fontSize(6)
                    .fillColor('#000000');
                doc
                    .font('Helvetica-Bold')
                    .fontSize(6)
                    .fillColor('#000000')
                    .text('T    : 021-50106277', 580, 490, {
                    align: 'left',
                    width: 300,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(6)
                    .fillColor('#000000')
                    .text('E    : info@jardineasiapasific.asia', 580, 500, {
                    align: 'left',
                    width: 300,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(6)
                    .fillColor('#000000')
                    .text('W    : jardineasiapasific.asia', 580, 510, {
                    align: 'left',
                    width: 300,
                });
                for (let iTable = 0; iTable < page; iTable++) {
                    doc.addPage();
                    const headerImageX = doc.page.width - doc.page.margins.right - 150;
                    const headerImageY = 20;
                    doc.image(this.rootPathImageJAP + '/logo-new.png', headerImageX, headerImageY, {
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
                                    const imgWidth = rectCell.width;
                                    const imgHeight = rectCell.height;
                                    const xPos = rectCell.x + (rectCell.width - imgWidth) / 2;
                                    const yPos = rectCell.y + (rectCell.height - imgHeight) / 2;
                                    doc.image(this.rootPathImageJAP + '/logo-jap.png', xPos, yPos, {
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
                                    if ((0, fs_1.existsSync)(value)) {
                                        doc.image(value, xPos, yPos, {
                                            width: imgWidth,
                                            height: imgHeight,
                                        });
                                    }
                                    else {
                                        doc.image(this.rootPathImageJAP + '/no-image.jpg', xPos, yPos, {
                                            width: imgWidth,
                                            height: imgHeight,
                                        });
                                    }
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
                        return dt.price_rent_sqm;
                    });
                    const row10 = databuilding.map((dt) => {
                        return dt.service_charge;
                    });
                    const row11 = databuilding.map((dt) => {
                        return dt['cost_total'];
                    });
                    const row12 = databuilding.map((dt) => {
                        return 'bold:' + dt['cost_total_tax'];
                    });
                    const row13 = 'merge row';
                    const row14 = '';
                    const row15 = databuilding.map((dt) => {
                        return dt['nego_rent'];
                    });
                    const row16 = databuilding.map((dt) => {
                        return dt.service_charge;
                    });
                    const row17 = databuilding.map((dt) => {
                        return dt['total_cost_bargain'];
                    });
                    const row18 = databuilding.map((dt) => {
                        return 'bold:' + dt['bargain_tax'];
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
                    let textPositionYEstimateNego = 500;
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
                    doc.image(this.rootPathImageJAP + '/footer.png', imageFooterX, imageFooterY, {
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
                doc.image(this.rootPathImageJAP + '/cover-back.png', coverBackImageX, coverBackImageY, {
                    width: coverBackImageWidth,
                    height: coverBackImageHeight,
                });
                doc.image(this.rootPathImageJAP + '/white.jpg', 85, 180, {
                    width: 250,
                    height: 200,
                });
                const adminName = admin.user.first_name + ' ' + admin.user.last_name;
                doc
                    .font('Helvetica-Bold')
                    .fontSize(10)
                    .fillColor('#000000')
                    .text(adminName !== '' ? adminName : admin.user.username, 89, 200, {
                    align: 'left',
                    width: 150,
                });
                doc
                    .font('Helvetica')
                    .fontSize(10)
                    .fillColor('#000000')
                    .text(admin.user.phone_number ?? '+62 87870702538', 89, 230, {
                    align: 'left',
                    width: 150,
                });
                doc
                    .font('Helvetica')
                    .fontSize(10)
                    .fillColor('#000000')
                    .text('fauzanrusdi20@gmail.com', 89, 245, {
                    align: 'left',
                    width: 150,
                });
                doc.image(this.rootPathImageJAP + '/white.jpg', 500, 250, {
                    width: 250,
                    height: 200,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(7)
                    .fillColor('#000000')
                    .text('PT. Jardine Asia Pasific', 500, 260, {
                    align: 'left',
                    width: 150,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(7)
                    .fillColor('#000000')
                    .text('World Trade Centre, WTC 5, Lt. 11,', 500, 273, {
                    align: 'left',
                    width: 150,
                });
                doc
                    .text('Jl. Jend Sudirman Kav. 29-31, Kel. Karet, Setiabudi, Jakarta Selatan -', 500, 286, {
                    align: 'left',
                    width: 300,
                })
                    .font('Helvetica-Bold')
                    .fontSize(7)
                    .fillColor('#000000');
                doc
                    .text('DKl Jakarta, 12920', 500, 299, {
                    align: 'left',
                    width: 300,
                })
                    .font('Helvetica-Bold')
                    .fontSize(7)
                    .fillColor('#000000');
                doc
                    .font('Helvetica-Bold')
                    .fontSize(7)
                    .fillColor('#000000')
                    .text('T    : 021-50106277', 500, 312, {
                    align: 'left',
                    width: 300,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(7)
                    .fillColor('#000000')
                    .text('E    : info@jardineasiapasific.asia', 500, 325, {
                    align: 'left',
                    width: 300,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(7)
                    .fillColor('#000000')
                    .text('W    : jardineasiapasific.asia', 500, 338, {
                    align: 'left',
                    width: 300,
                });
                doc.end();
                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', () => resolve(Buffer.concat(buffers)));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async generatePDFDetailProperty(property_slug) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = {
                    where: {
                        slug: property_slug,
                    },
                    relations: {
                        units: true,
                        images: true,
                    },
                };
                const getData = await this.repository.findOne(query);
                const buffers = [];
                let doc = new PDFDocumentHolland({
                    margin: 20,
                    width: 1200,
                    height: 2000,
                });
                const headerImageX = doc.page.width - doc.page.margins.right - 150;
                const headerImageY = 20;
                doc.image(this.rootPathImageJAP + '/logo-new.png', headerImageX, headerImageY, {
                    width: 70,
                    height: 50,
                });
                const imageFooterX = 25;
                const imageFooterY = 690;
                doc.image(this.rootPathImageJAP + '/footer2.png', imageFooterX, imageFooterY, {
                    width: 550,
                    height: 40,
                });
                if (getData.images.length > 0) {
                    const imagePropertyPath = getData.images[0].path + '/' + getData.images[0].public_id;
                    doc.image(imagePropertyPath, 25, 70, {
                        width: 138,
                        height: 188,
                    });
                }
                let address = getData.location;
                const start = getData.address.toLowerCase().indexOf('jl');
                if (start !== -1) {
                    const end = getData.address.indexOf(',', start);
                    address = getData.address.substring(start, end).trim();
                }
                doc
                    .font('Helvetica-Bold')
                    .fontSize(13)
                    .text('OFFICE FOR LEASE', 210, 35)
                    .fillColor('black');
                doc
                    .font('Helvetica-Bold')
                    .fontSize(13)
                    .text(getData.name, 35, 15)
                    .fillColor('black');
                doc
                    .font('Helvetica')
                    .fontSize(10)
                    .text(address, 35, 40)
                    .fillColor('black');
                const positionXTable = 25;
                const positionYTable = 70;
                const widthTable = 530;
                const fontSize = 7;
                const fontSizeHeader = 8;
                const fontSizeHeaderBlack = 9;
                const heightCell = 17;
                const moveDown = 0.3;
                let dynamicRows = [
                    {
                        content: [
                            {
                                value: 'Availability & Payment Spesification',
                                colspan: 6,
                                align: { x: 'center', y: 'bottom' },
                            },
                        ],
                        styles: {
                            fontSize: fontSizeHeaderBlack,
                            backgroundColor: '#f0f2f5',
                            textColor: 'black',
                            textStroke: '0.3px',
                            align: 'center',
                        },
                    },
                    {
                        content: [
                            {
                                value: 'Floor',
                                rowspan: 2,
                                width: 100,
                                cellWidth: 100,
                            },
                            {
                                value: 'Semi - Gross (sqm)',
                                rowspan: 2,
                            },
                            {
                                value: 'Price / sqm',
                                colspan: 2,
                            },
                            {
                                value: 'Price Month',
                                rowspan: 2,
                            },
                            {
                                value: 'Condition',
                                rowspan: 2,
                            },
                        ],
                        styles: {
                            fontSize: fontSizeHeader,
                            backgroundColor: '#1f497d',
                            textColor: 'white',
                        },
                    },
                    {
                        content: ['Rental Price', 'Service Charge'],
                        styles: {
                            fontSize: fontSizeHeader,
                            backgroundColor: '#1f497d',
                            textColor: 'white',
                        },
                    },
                ];
                if (getData.units.length > 0) {
                    getData.units = getData.units.slice(0, 8);
                    for (const unit of getData.units) {
                        const size = unit.size;
                        const rentalPrice = getData.price_rent_sqm;
                        const serviceCharge = getData.service_charge;
                        const priceMonth = (rentalPrice + serviceCharge) * size;
                        dynamicRows.push({
                            content: [
                                unit.floor,
                                unit.size,
                                (0, currency_helper_1.formatCurrency)(rentalPrice),
                                (0, currency_helper_1.formatCurrency)(serviceCharge),
                                (0, currency_helper_1.formatCurrency)(priceMonth),
                                unit.condition,
                            ],
                        });
                    }
                }
                const table = doc.table({
                    x: 165,
                    y: positionYTable,
                    cellHeight: heightCell,
                    cellWidth: 65,
                    rows: 11,
                    border: 0.5,
                    borderColor: 'white',
                    defaultCell: {
                        fontSize: fontSize,
                        align: 'center',
                        textColor: 'black',
                        backgroundColor: '#f0f2f5',
                        border: 0.5,
                        borderColor: 'white',
                    },
                });
                dynamicRows.forEach((rowConfig) => {
                    table.row(rowConfig.content, rowConfig.styles || {});
                });
                doc.moveDown(moveDown);
                doc
                    .table({
                    x: positionXTable,
                    width: widthTable,
                    cellHeight: heightCell,
                    rows: 5,
                    border: 0.5,
                    borderColor: 'white',
                    defaultCell: {
                        fontSize: fontSize,
                        align: 'center',
                        textColor: 'black',
                        backgroundColor: '#f0f2f5',
                        border: 0.5,
                        borderColor: 'white',
                    },
                })
                    .row([
                    {
                        value: 'Deposit',
                        colspan: 3,
                    },
                    {
                        value: 'Overtime Charges',
                        rowspan: 2,
                        colspan: 2,
                    },
                ], {
                    fontSize: fontSizeHeader,
                    backgroundColor: '#1f497d',
                    textColor: 'white',
                })
                    .row(['Type', 'Amount', { value: 'Refund', width: 30 }], {
                    fontSize: fontSizeHeader,
                    backgroundColor: '#1f497d',
                    textColor: 'white',
                })
                    .row([
                    'Booking Deposit',
                    getData.booking_deposit,
                    'No',
                    'Electricity',
                    getData.price_overtime_electricity,
                ])
                    .row([
                    'Security Deposit',
                    { value: getData.security_deposit, fontSize: 6 },
                    'Yes',
                    'Air Conditioning',
                    getData.price_overtime_ac,
                ])
                    .row([
                    'Telephone Deposit',
                    getData.phone_deposit,
                    'Yes',
                    'Lightning',
                    getData.price_overtime_lighting,
                ]);
                doc.moveDown(moveDown);
                doc
                    .table({
                    x: positionXTable,
                    width: widthTable,
                    cellHeight: heightCell,
                    rows: 5,
                    border: 0.5,
                    borderColor: 'white',
                    defaultCell: {
                        fontSize: fontSize,
                        align: 'center',
                        textColor: 'black',
                        backgroundColor: '#f0f2f5',
                        border: 0.5,
                        borderColor: 'white',
                    },
                })
                    .row([
                    {
                        value: 'Parking Charges',
                        colspan: 4,
                    },
                    {
                        value: 'Minimum Lease Term',
                        rowspan: 2,
                    },
                    {
                        value: 'Payment Term',
                        rowspan: 2,
                    },
                ], {
                    fontSize: fontSizeHeader,
                    backgroundColor: '#1f497d',
                    textColor: 'white',
                })
                    .row(['Type', 'Payment Term', 'Cost (IDR)', 'Cost (USD)'], {
                    fontSize: fontSizeHeader,
                    backgroundColor: '#1f497d',
                    textColor: 'white',
                })
                    .row([
                    'Reserved (car)',
                    'yearly',
                    getData.parking_charge_reserved_car,
                    '',
                    {
                        value: getData.minimum_lease_term ?? 'tba',
                        rowspan: 3,
                    },
                    {
                        value: getData.payment_term ?? 'tba',
                        rowspan: 3,
                    },
                ])
                    .row([
                    'Unreserved (car)',
                    'yearly',
                    getData.parking_charge_unreserved_car,
                    '',
                ])
                    .row([
                    'Motorcycle',
                    'yearly',
                    getData.parking_charge_unreserved_car,
                    '',
                ]);
                doc.moveDown(moveDown);
                doc
                    .table({
                    x: positionXTable,
                    width: widthTable,
                    cellHeight: heightCell,
                    rows: 4,
                    border: 0.5,
                    borderColor: 'white',
                    defaultCell: {
                        fontSize: 7,
                        align: 'center',
                        textColor: 'black',
                        backgroundColor: '#f0f2f5',
                        border: 0.5,
                        borderColor: 'white',
                    },
                })
                    .row([
                    {
                        value: 'Building Spesification',
                        colspan: 6,
                        align: { x: 'center', y: 'bottom' },
                    },
                ], {
                    fontSize: fontSizeHeaderBlack,
                    backgroundColor: '#f0f2f5',
                    textColor: 'black',
                    textStroke: '0.5px',
                })
                    .row([
                    'Number of Floor',
                    'Lift',
                    'Celling Height',
                    'Typical Floor Size',
                    'Total Semi Gross Area',
                    'Power Back Up',
                ], {
                    fontSize: fontSizeHeader,
                    backgroundColor: '#1f497d',
                    textColor: 'white',
                })
                    .row([
                    'Level of Tenancy Floor',
                    'Passenger',
                    'Ground Floor 6 m',
                    { value: '  sqm', rowspan: 2 },
                    { value: '13.000', rowspan: 2 },
                    { value: '100%', rowspan: 2 },
                ])
                    .row(['Level of Basements', 'Service Lift', 'Typical 2.75 m']);
                doc.moveDown(moveDown);
                doc
                    .table({
                    x: positionXTable,
                    width: widthTable,
                    cellHeight: 30,
                    rows: 2,
                    border: 0.5,
                    borderColor: 'white',
                    defaultCell: {
                        fontSize: fontSize,
                        align: 'center',
                        textColor: 'black',
                        backgroundColor: '#f0f2f5',
                        border: 0.5,
                        borderColor: 'white',
                    },
                })
                    .row([
                    'Loading Capacity (typical)',
                    {
                        value: 'Telecommunication',
                        colspan: 3,
                    },
                    {
                        value: 'Fire Safety',
                        colspan: 3,
                    },
                ], {
                    fontSize: fontSizeHeader,
                    backgroundColor: '#1f497d',
                    textColor: 'white',
                })
                    .row([
                    getData.other_info_loading_capacity ?? 'tba',
                    getData.telecommunication_isp ? 'ISP : Y' : 'ISP : N',
                    getData.telecommunication_fiber_optic
                        ? 'Fiber Optic : Y'
                        : 'Fiber Optic : N',
                    getData.telecommunication_wifi ? 'Wifi : Y' : 'Wifi : N',
                    getData.fire_safety_sprinkle ? 'Sprinkle : Y' : 'Sprinkle : N',
                    getData.fire_safety_heat_detector
                        ? 'Heat Detector : Y'
                        : 'Heat Detector : N',
                    getData.fire_safety_smoke_detector
                        ? 'Smoke Detector : Y'
                        : 'Smoke Detector : N',
                ]);
                doc.moveDown(moveDown);
                doc
                    .table({
                    x: positionXTable,
                    width: widthTable,
                    cellHeight: heightCell,
                    rows: 2,
                    border: 0.5,
                    borderColor: 'white',
                    defaultCell: {
                        fontSize: fontSize,
                        align: 'center',
                        textColor: 'black',
                        backgroundColor: '#f0f2f5',
                        border: 0.5,
                        borderColor: 'white',
                    },
                })
                    .row(['Ac System', 'AC Zoning', ' Electricty', 'Power (KVA)'], {
                    fontSize: fontSizeHeader,
                    backgroundColor: '#1f497d',
                    textColor: 'white',
                })
                    .row([
                    getData.other_info_ac_system == null || ''
                        ? 'tba'
                        : getData.other_info_ac_system,
                    getData.other_info_ac_zoning ?? 'tba',
                    getData.other_info_electricity ?? 'tba',
                    getData.other_info_power_unit ?? 'tba',
                ]);
                doc.moveDown(moveDown);
                doc
                    .table({
                    x: positionXTable,
                    width: widthTable,
                    cellHeight: heightCell,
                    rows: 3,
                    border: 0.5,
                    borderColor: 'white',
                    defaultCell: {
                        fontSize: fontSize,
                        align: 'center',
                        textColor: 'black',
                        backgroundColor: '#f0f2f5',
                        border: 0.5,
                        borderColor: 'white',
                    },
                })
                    .row([
                    {
                        value: 'General Information',
                        colspan: 7,
                        align: { x: 'center', y: 'bottom' },
                    },
                ], {
                    fontSize: fontSizeHeaderBlack,
                    backgroundColor: '#f0f2f5',
                    textColor: 'black',
                    textStroke: '0.5px',
                })
                    .row([
                    'Office Hour',
                    'Time',
                    'Building Complition',
                    'Occupancy rate',
                    {
                        value: 'Amenities',
                        colspan: 3,
                    },
                ], {
                    fontSize: fontSizeHeader,
                    backgroundColor: '#1f497d',
                    textColor: 'white',
                })
                    .row([
                    'Monday - Friday',
                    getData.office_hours_weekday,
                    {
                        value: getData.completion,
                        rowspan: 2,
                    },
                    {
                        value: '',
                        rowspan: 2,
                    },
                    getData.amenities[0],
                    getData.amenities[1],
                    getData.amenities[2],
                ])
                    .row([
                    'Saturday',
                    getData.office_hours_weekend,
                    getData.amenities[3],
                    getData.amenities[4],
                    '',
                ]);
                doc.end();
                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', () => resolve(Buffer.concat(buffers)));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async generatePDFComparissonNew(propertiesData, admin) {
        return new Promise(async (resolve, reject) => {
            try {
                const queryUnit = {
                    select: {
                        unit_id: true,
                        size: true,
                        condition: true,
                        floor: true,
                        property: {
                            property_id: true,
                            name: true,
                            location: true,
                            property_size: true,
                            total_floor: true,
                            price_overtime_ac: true,
                            price_overtime_electricity: true,
                            images: {
                                full_url: true,
                            },
                            price_rent_sqm: true,
                            service_charge: true,
                            ac_info: true,
                            electricity_info: true,
                            lighting_info: true,
                        },
                    },
                    where: {
                        unit_id: (0, typeorm_1.In)(propertiesData.unit_id),
                    },
                    relations: {
                        property: {
                            images: true,
                        },
                    },
                    order: {
                        property_id: 'ASC',
                    },
                };
                const getData = await this.unitService.findCustomOptions(queryUnit);
                const buffers = [];
                const doc = new PDFDocument({
                    margin: 30,
                    width: 300,
                    size: 'A4',
                    layout: 'landscape',
                });
                const propertiesNew = getData.map((dt) => {
                    let size = dt.size ?? dt.property.property_size ?? 0;
                    const priceRent = dt.property.price_rent_sqm ?? 0;
                    const serviceCharge = dt.property.service_charge ?? 0;
                    const costTotal = priceRent > 0 ? size * (priceRent + serviceCharge) : 0;
                    const negoRent = priceRent > 0 ? priceRent - 10000 : 0;
                    const totalCostBargain = negoRent > 0 ? size * (negoRent + serviceCharge) : 0;
                    return {
                        unit_id: dt.unit_id,
                        name: dt.property.name,
                        image: dt.property.images.length > 0
                            ? dt.property.images[0].full_url
                            : '',
                        location: dt.property.location,
                        property_size: size === 0 ? 'TBA' : size,
                        total_floor: dt.floor ?? 'TBA',
                        price_overtime_ac: dt.property.ac_info ?? 'TBA',
                        price_overtime_electricity: dt.property.electricity_info ?? 'TBA',
                        condition: dt.condition ?? 'Bare',
                        price_rent_sqm: (0, currency_helper_1.formatCurrency)(priceRent),
                        service_charge: (0, currency_helper_1.formatCurrency)(serviceCharge),
                        cost_total: (0, currency_helper_1.formatCurrency)(costTotal),
                        cost_total_tax: costTotal > 0
                            ? (0, currency_helper_1.formatCurrency)(0.11 * costTotal + costTotal)
                            : (0, currency_helper_1.formatCurrency)(0),
                        nego_rent: (0, currency_helper_1.formatCurrency)(negoRent),
                        total_cost_bargain: (0, currency_helper_1.formatCurrency)(totalCostBargain),
                        bargain_tax: totalCostBargain > 0
                            ? (0, currency_helper_1.formatCurrency)(totalCostBargain * 0.11 + totalCostBargain)
                            : (0, currency_helper_1.formatCurrency)(0),
                    };
                });
                const dataPerPage = 5;
                const page = Math.ceil(propertiesNew.length / dataPerPage);
                const coverImageWidth = 750;
                const coverImageHeight = 500;
                const coverImageX = (doc.page.width - coverImageWidth) / 2;
                const coverImageY = (doc.page.height - coverImageHeight) / 2;
                const [coverImage, logo, logoNew, noImage, coverBack, whiteImage, footerImage,] = await Promise.all([
                    this.fetchImage('https://res.cloudinary.com/servicebizimage/image/upload/v1748412406/cover_aftuu4.png'),
                    this.fetchImage('https://res.cloudinary.com/servicebizimage/image/upload/v1748412837/logo-jap_phsabu.png'),
                    this.fetchImage('https://res.cloudinary.com/servicebizimage/image/upload/v1748412838/logo-new_hk3vvn.png'),
                    this.fetchImage('https://res.cloudinary.com/servicebizimage/image/upload/v1748412837/no-image_bnkobg.jpg'),
                    this.fetchImage('https://res.cloudinary.com/servicebizimage/image/upload/v1748412838/cover-back_owp7gd.png'),
                    this.fetchImage('https://res.cloudinary.com/servicebizimage/image/upload/v1748412836/white_amk5jh.jpg'),
                    this.fetchImage('https://res.cloudinary.com/servicebizimage/image/upload/v1748412838/footer_yzecvl.png'),
                ]);
                doc.image(coverImage, coverImageX, coverImageY, {
                    width: coverImageWidth,
                    height: coverImageHeight,
                });
                doc.image(whiteImage, 575, 450, {
                    width: 200,
                    height: 150,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(6)
                    .fillColor('#000000')
                    .text('PT. Jardine Asia Pasific', 580, 450, {
                    align: 'left',
                    width: 150,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(6)
                    .fillColor('#000000')
                    .text('World Trade Centre, WTC 5, Lt. 11,', 580, 460, {
                    align: 'left',
                    width: 150,
                });
                doc
                    .text('Jl. Jend Sudirman Kav. 29-31, Kel. Karet, Setiabudi, Jakarta Selatan -', 580, 470, {
                    align: 'left',
                    width: 300,
                })
                    .font('Helvetica-Bold')
                    .fontSize(6)
                    .fillColor('#000000');
                doc
                    .text('DKl Jakarta, 12920', 580, 480, {
                    align: 'left',
                    width: 300,
                })
                    .font('Helvetica-Bold')
                    .fontSize(6)
                    .fillColor('#000000');
                doc
                    .font('Helvetica-Bold')
                    .fontSize(6)
                    .fillColor('#000000')
                    .text('T    : 021-50106277', 580, 490, {
                    align: 'left',
                    width: 300,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(6)
                    .fillColor('#000000')
                    .text('E    : info@jardineasiapasific.asia', 580, 500, {
                    align: 'left',
                    width: 300,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(6)
                    .fillColor('#000000')
                    .text('W    : jardineasiapasific.asia', 580, 510, {
                    align: 'left',
                    width: 300,
                });
                for (let iTable = 0; iTable < page; iTable++) {
                    doc.addPage();
                    const headerImageX = doc.page.width - doc.page.margins.right - 150;
                    const headerImageY = 20;
                    doc.image(logoNew, headerImageX, headerImageY, {
                        width: 80,
                        height: 40,
                    });
                    let databuilding;
                    if (iTable === 0) {
                        databuilding = propertiesNew.slice(iTable, dataPerPage);
                    }
                    else {
                        const start = iTable * dataPerPage;
                        const end = start * dataPerPage;
                        databuilding = propertiesNew.slice(start, end);
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
                                    const imgWidth = rectCell.width;
                                    const imgHeight = rectCell.height;
                                    const xPos = rectCell.x + (rectCell.width - imgWidth) / 2;
                                    const yPos = rectCell.y + (rectCell.height - imgHeight) / 2;
                                    doc.image(logo, xPos, yPos, {
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
                            property: dt.name + '-' + dt.unit_id,
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
                                    if ((0, fs_1.existsSync)(value)) {
                                        doc.image(value, xPos, yPos, {
                                            width: imgWidth,
                                            height: imgHeight,
                                        });
                                    }
                                    else {
                                        doc.image(noImage, xPos, yPos, {
                                            width: imgWidth,
                                            height: imgHeight,
                                        });
                                    }
                                    console.log('value doc', value);
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
                        return dt.price_rent_sqm;
                    });
                    const row10 = databuilding.map((dt) => {
                        return dt.service_charge;
                    });
                    const row11 = databuilding.map((dt) => {
                        return dt['cost_total'];
                    });
                    const row12 = databuilding.map((dt) => {
                        return 'bold:' + dt['cost_total_tax'];
                    });
                    const row13 = 'merge row';
                    const row14 = '';
                    const row15 = databuilding.map((dt) => {
                        return dt['nego_rent'];
                    });
                    const row16 = databuilding.map((dt) => {
                        return dt.service_charge;
                    });
                    const row17 = databuilding.map((dt) => {
                        return dt['total_cost_bargain'];
                    });
                    const row18 = databuilding.map((dt) => {
                        return 'bold:' + dt['bargain_tax'];
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
                    let textPositionYEstimateNego = 400;
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
                    doc.image(footerImage, imageFooterX, imageFooterY, {
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
                doc.image(coverBack, coverBackImageX, coverBackImageY, {
                    width: coverBackImageWidth,
                    height: coverBackImageHeight,
                });
                doc.image(whiteImage, 85, 180, {
                    width: 250,
                    height: 200,
                });
                const adminName = admin.user.first_name + ' ' + admin.user.last_name;
                doc
                    .font('Helvetica-Bold')
                    .fontSize(10)
                    .fillColor('#000000')
                    .text(adminName !== '' ? adminName : admin.user.username, 89, 200, {
                    align: 'left',
                    width: 150,
                });
                doc
                    .font('Helvetica')
                    .fontSize(10)
                    .fillColor('#000000')
                    .text(admin.user.phone_number ?? '+62 ', 89, 230, {
                    align: 'left',
                    width: 150,
                });
                doc
                    .font('Helvetica')
                    .fontSize(10)
                    .fillColor('#000000')
                    .text(admin.user.email, 89, 245, {
                    align: 'left',
                    width: 150,
                });
                doc.image(whiteImage, 500, 250, {
                    width: 250,
                    height: 200,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(7)
                    .fillColor('#000000')
                    .text('PT. Jardine Asia Pasific', 500, 260, {
                    align: 'left',
                    width: 150,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(7)
                    .fillColor('#000000')
                    .text('World Trade Centre, WTC 5, Lt. 11,', 500, 273, {
                    align: 'left',
                    width: 150,
                });
                doc
                    .text('Jl. Jend Sudirman Kav. 29-31, Kel. Karet, Setiabudi, Jakarta Selatan -', 500, 286, {
                    align: 'left',
                    width: 300,
                })
                    .font('Helvetica-Bold')
                    .fontSize(7)
                    .fillColor('#000000');
                doc
                    .text('DKl Jakarta, 12920', 500, 299, {
                    align: 'left',
                    width: 300,
                })
                    .font('Helvetica-Bold')
                    .fontSize(7)
                    .fillColor('#000000');
                doc
                    .font('Helvetica-Bold')
                    .fontSize(7)
                    .fillColor('#000000')
                    .text('T    : 021-50106277', 500, 312, {
                    align: 'left',
                    width: 300,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(7)
                    .fillColor('#000000')
                    .text('E    : info@jardineasiapasific.asia', 500, 325, {
                    align: 'left',
                    width: 300,
                });
                doc
                    .font('Helvetica-Bold')
                    .fontSize(7)
                    .fillColor('#000000')
                    .text('W    : jardineasiapasific.asia', 500, 338, {
                    align: 'left',
                    width: 300,
                });
                doc.end();
                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', () => resolve(Buffer.concat(buffers)));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async generatePDFDetailPropertyDetail(propertiesData) {
        return new Promise(async (resolve, reject) => {
            try {
                const buffers = [];
                let doc = new PDFDocumentHolland({
                    margin: 20,
                    width: 1200,
                    height: 2000,
                });
                for (const [index, property,] of propertiesData.properties_download.entries()) {
                    const query = {
                        where: {
                            property_id: property.property_id,
                            units: {
                                unit_id: (0, typeorm_1.In)(property.unit_id),
                            },
                        },
                        relations: {
                            units: true,
                            images: true,
                        },
                    };
                    const getData = await this.repository.findOne(query);
                    const [logoNew, footerImage] = await Promise.all([
                        this.fetchImage('https://res.cloudinary.com/servicebizimage/image/upload/v1748412838/logo-new_hk3vvn.png'),
                        this.fetchImage('https://res.cloudinary.com/servicebizimage/image/upload/v1748412838/footer2_s7vkbt.png'),
                    ]);
                    const headerImageX = doc.page.width - doc.page.margins.right - 150;
                    const headerImageY = 20;
                    doc.image(logoNew, headerImageX, headerImageY, {
                        width: 70,
                        height: 50,
                    });
                    const imageFooterX = 25;
                    const imageFooterY = 690;
                    doc.image(footerImage, imageFooterX, imageFooterY, {
                        width: 550,
                        height: 40,
                    });
                    if (getData.images.length > 0) {
                        const logo = await this.fetchImage(getData.images[0].full_url);
                        doc.image(logo, 25, 70, {
                            width: 138,
                            height: 188,
                        });
                    }
                    let address = getData.location;
                    if (getData.address) {
                        const start = getData.address.toLowerCase().indexOf('jl');
                        console.log('satr', start);
                        if (start !== -1) {
                            const end = getData.address.indexOf(',', start);
                            address = getData.address.substring(start, end).trim();
                        }
                    }
                    doc
                        .font('Helvetica-Bold')
                        .fontSize(13)
                        .text('OFFICE FOR LEASE', 210, 35)
                        .fillColor('black');
                    doc
                        .font('Helvetica-Bold')
                        .fontSize(13)
                        .text(getData.name, 35, 15)
                        .fillColor('black');
                    doc
                        .font('Helvetica')
                        .fontSize(10)
                        .text(address, 35, 40)
                        .fillColor('black');
                    const positionXTable = 25;
                    const positionYTable = 70;
                    const widthTable = 530;
                    const fontSize = 7;
                    const fontSizeHeader = 8;
                    const fontSizeHeaderBlack = 9;
                    const heightCell = 17;
                    const moveDown = 0.3;
                    let dynamicRows = [
                        {
                            content: [
                                {
                                    value: 'Availability & Payment Spesification',
                                    colspan: 6,
                                    align: { x: 'center', y: 'bottom' },
                                },
                            ],
                            styles: {
                                fontSize: fontSizeHeaderBlack,
                                backgroundColor: '#f0f2f5',
                                textColor: 'black',
                                textStroke: '0.3px',
                                align: 'center',
                            },
                        },
                        {
                            content: [
                                {
                                    value: 'Floor',
                                    rowspan: 2,
                                    width: 100,
                                    cellWidth: 100,
                                },
                                {
                                    value: 'Semi - Gross (sqm)',
                                    rowspan: 2,
                                },
                                {
                                    value: 'Price / sqm',
                                    colspan: 2,
                                },
                                {
                                    value: 'Price Month',
                                    rowspan: 2,
                                },
                                {
                                    value: 'Condition',
                                    rowspan: 2,
                                },
                            ],
                            styles: {
                                fontSize: fontSizeHeader,
                                backgroundColor: '#1f497d',
                                textColor: 'white',
                            },
                        },
                        {
                            content: ['Rental Price', 'Service Charge'],
                            styles: {
                                fontSize: fontSizeHeader,
                                backgroundColor: '#1f497d',
                                textColor: 'white',
                            },
                        },
                    ];
                    if (getData.units.length > 0) {
                        getData.units = getData.units.slice(0, 8);
                        for (const unit of getData.units) {
                            const size = unit.size;
                            const rentalPrice = getData.price_rent_sqm;
                            const serviceCharge = getData.service_charge;
                            const priceMonth = (rentalPrice + serviceCharge) * size;
                            dynamicRows.push({
                                content: [
                                    unit.floor,
                                    unit.size,
                                    (0, currency_helper_1.formatCurrency)(rentalPrice),
                                    (0, currency_helper_1.formatCurrency)(serviceCharge),
                                    (0, currency_helper_1.formatCurrency)(priceMonth),
                                    unit.condition,
                                ],
                            });
                        }
                    }
                    const table = doc.table({
                        x: 165,
                        y: positionYTable,
                        cellHeight: heightCell,
                        cellWidth: 65,
                        rows: 11,
                        border: 0.5,
                        borderColor: 'white',
                        defaultCell: {
                            fontSize: fontSize,
                            align: 'center',
                            textColor: 'black',
                            backgroundColor: '#f0f2f5',
                            border: 0.5,
                            borderColor: 'white',
                        },
                    });
                    dynamicRows.forEach((rowConfig) => {
                        table.row(rowConfig.content, rowConfig.styles || {});
                    });
                    if (dynamicRows.length < 8) {
                        for (let index = 0; index <= 10 - dynamicRows.length; index++) {
                            table.row(['', '', '', '', '', '']);
                        }
                    }
                    doc.moveDown(moveDown);
                    doc
                        .table({
                        x: positionXTable,
                        width: widthTable,
                        cellHeight: heightCell,
                        rows: 5,
                        border: 0.5,
                        borderColor: 'white',
                        defaultCell: {
                            fontSize: fontSize,
                            align: 'center',
                            textColor: 'black',
                            backgroundColor: '#f0f2f5',
                            border: 0.5,
                            borderColor: 'white',
                        },
                    })
                        .row([
                        {
                            value: 'Deposit',
                            colspan: 3,
                        },
                        {
                            value: 'Overtime Charges',
                            rowspan: 2,
                            colspan: 2,
                        },
                    ], {
                        fontSize: fontSizeHeader,
                        backgroundColor: '#1f497d',
                        textColor: 'white',
                    })
                        .row(['Type', 'Amount', { value: 'Refund', width: 30 }], {
                        fontSize: fontSizeHeader,
                        backgroundColor: '#1f497d',
                        textColor: 'white',
                    })
                        .row([
                        'Booking Deposit',
                        getData.booking_deposit,
                        'No',
                        'Electricity',
                        getData.price_overtime_electricity,
                    ])
                        .row([
                        'Security Deposit',
                        { value: getData.security_deposit, fontSize: 6 },
                        'Yes',
                        'Air Conditioning',
                        getData.price_overtime_ac,
                    ])
                        .row([
                        'Telephone Deposit',
                        getData.phone_deposit,
                        'Yes',
                        'Lightning',
                        getData.price_overtime_lighting,
                    ]);
                    doc.moveDown(moveDown);
                    doc
                        .table({
                        x: positionXTable,
                        width: widthTable,
                        cellHeight: heightCell,
                        rows: 5,
                        border: 0.5,
                        borderColor: 'white',
                        defaultCell: {
                            fontSize: fontSize,
                            align: 'center',
                            textColor: 'black',
                            backgroundColor: '#f0f2f5',
                            border: 0.5,
                            borderColor: 'white',
                        },
                    })
                        .row([
                        {
                            value: 'Parking Charges',
                            colspan: 4,
                        },
                        {
                            value: 'Minimum Lease Term',
                            rowspan: 2,
                        },
                        {
                            value: 'Payment Term',
                            rowspan: 2,
                        },
                    ], {
                        fontSize: fontSizeHeader,
                        backgroundColor: '#1f497d',
                        textColor: 'white',
                    })
                        .row(['Type', 'Payment Term', 'Cost (IDR)', 'Cost (USD)'], {
                        fontSize: fontSizeHeader,
                        backgroundColor: '#1f497d',
                        textColor: 'white',
                    })
                        .row([
                        'Reserved (car)',
                        'yearly',
                        getData.parking_charge_reserved_car,
                        '',
                        {
                            value: getData.minimum_lease_term ?? 'tba',
                            rowspan: 3,
                        },
                        {
                            value: getData.payment_term ?? 'tba',
                            rowspan: 3,
                        },
                    ])
                        .row([
                        'Unreserved (car)',
                        'yearly',
                        getData.parking_charge_unreserved_car,
                        '',
                    ])
                        .row([
                        'Motorcycle',
                        'yearly',
                        getData.parking_charge_unreserved_car,
                        '',
                    ]);
                    doc.moveDown(moveDown);
                    doc
                        .table({
                        x: positionXTable,
                        width: widthTable,
                        cellHeight: heightCell,
                        rows: 4,
                        border: 0.5,
                        borderColor: 'white',
                        defaultCell: {
                            fontSize: 7,
                            align: 'center',
                            textColor: 'black',
                            backgroundColor: '#f0f2f5',
                            border: 0.5,
                            borderColor: 'white',
                        },
                    })
                        .row([
                        {
                            value: 'Building Spesification',
                            colspan: 6,
                            align: { x: 'center', y: 'bottom' },
                        },
                    ], {
                        fontSize: fontSizeHeaderBlack,
                        backgroundColor: '#f0f2f5',
                        textColor: 'black',
                        textStroke: '0.5px',
                    })
                        .row([
                        'Number of Floor',
                        'Lift',
                        'Celling Height',
                        'Typical Floor Size',
                        'Total Semi Gross Area',
                        'Power Back Up',
                    ], {
                        fontSize: fontSizeHeader,
                        backgroundColor: '#1f497d',
                        textColor: 'white',
                    })
                        .row([
                        'Level of Tenancy Floor',
                        'Passenger',
                        'Ground Floor 6 m',
                        { value: '  sqm', rowspan: 2 },
                        { value: '13.000', rowspan: 2 },
                        { value: '100%', rowspan: 2 },
                    ])
                        .row(['Level of Basements', 'Service Lift', 'Typical 2.75 m']);
                    doc.moveDown(moveDown);
                    doc
                        .table({
                        x: positionXTable,
                        width: widthTable,
                        cellHeight: 30,
                        rows: 2,
                        border: 0.5,
                        borderColor: 'white',
                        defaultCell: {
                            fontSize: fontSize,
                            align: 'center',
                            textColor: 'black',
                            backgroundColor: '#f0f2f5',
                            border: 0.5,
                            borderColor: 'white',
                        },
                    })
                        .row([
                        'Loading Capacity (typical)',
                        {
                            value: 'Telecommunication',
                            colspan: 3,
                        },
                        {
                            value: 'Fire Safety',
                            colspan: 3,
                        },
                    ], {
                        fontSize: fontSizeHeader,
                        backgroundColor: '#1f497d',
                        textColor: 'white',
                    })
                        .row([
                        getData.other_info_loading_capacity ?? 'tba',
                        getData.telecommunication_isp ? 'ISP : Y' : 'ISP : N',
                        getData.telecommunication_fiber_optic
                            ? 'Fiber Optic : Y'
                            : 'Fiber Optic : N',
                        getData.telecommunication_wifi ? 'Wifi : Y' : 'Wifi : N',
                        getData.fire_safety_sprinkle ? 'Sprinkle : Y' : 'Sprinkle : N',
                        getData.fire_safety_heat_detector
                            ? 'Heat Detector : Y'
                            : 'Heat Detector : N',
                        getData.fire_safety_smoke_detector
                            ? 'Smoke Detector : Y'
                            : 'Smoke Detector : N',
                    ]);
                    doc.moveDown(moveDown);
                    doc
                        .table({
                        x: positionXTable,
                        width: widthTable,
                        cellHeight: heightCell,
                        rows: 2,
                        border: 0.5,
                        borderColor: 'white',
                        defaultCell: {
                            fontSize: fontSize,
                            align: 'center',
                            textColor: 'black',
                            backgroundColor: '#f0f2f5',
                            border: 0.5,
                            borderColor: 'white',
                        },
                    })
                        .row(['Ac System', 'AC Zoning', ' Electricty', 'Power (KVA)'], {
                        fontSize: fontSizeHeader,
                        backgroundColor: '#1f497d',
                        textColor: 'white',
                    })
                        .row([
                        getData.other_info_ac_system == null || ''
                            ? 'tba'
                            : getData.other_info_ac_system,
                        getData.other_info_ac_zoning ?? 'tba',
                        getData.other_info_electricity ?? 'tba',
                        getData.other_info_power_unit ?? 'tba',
                    ]);
                    doc.moveDown(moveDown);
                    doc
                        .table({
                        x: positionXTable,
                        width: widthTable,
                        cellHeight: heightCell,
                        rows: 3,
                        border: 0.5,
                        borderColor: 'white',
                        defaultCell: {
                            fontSize: fontSize,
                            align: 'center',
                            textColor: 'black',
                            backgroundColor: '#f0f2f5',
                            border: 0.5,
                            borderColor: 'white',
                        },
                    })
                        .row([
                        {
                            value: 'General Information',
                            colspan: 7,
                            align: { x: 'center', y: 'bottom' },
                        },
                    ], {
                        fontSize: fontSizeHeaderBlack,
                        backgroundColor: '#f0f2f5',
                        textColor: 'black',
                        textStroke: '0.5px',
                    })
                        .row([
                        'Office Hour',
                        'Time',
                        'Building Complition',
                        'Occupancy rate',
                        {
                            value: 'Amenities',
                            colspan: 3,
                        },
                    ], {
                        fontSize: fontSizeHeader,
                        backgroundColor: '#1f497d',
                        textColor: 'white',
                    })
                        .row([
                        'Monday - Friday',
                        getData.office_hours_weekday,
                        {
                            value: getData.completion,
                            rowspan: 2,
                        },
                        {
                            value: '',
                            rowspan: 2,
                        },
                        getData.amenities[0],
                        getData.amenities[1],
                        getData.amenities[2],
                    ])
                        .row([
                        'Saturday',
                        getData.office_hours_weekend,
                        getData.amenities[3],
                        getData.amenities[4],
                        '',
                    ]);
                    if (index !== propertiesData.properties_download.length) {
                        doc.addPage();
                    }
                }
                doc.end();
                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', () => resolve(Buffer.concat(buffers)));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async fetchImage(src) {
        const image = await axios_1.default.get(src, {
            responseType: 'arraybuffer',
        });
        return image.data;
    }
};
exports.DashboardPropertiesGenerateFileService = DashboardPropertiesGenerateFileService;
exports.DashboardPropertiesGenerateFileService = DashboardPropertiesGenerateFileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [properties_repository_1.DashboardPropertiesRepository,
        units_service_1.DashboardUnitsService])
], DashboardPropertiesGenerateFileService);
//# sourceMappingURL=properties-generate-file.service.js.map