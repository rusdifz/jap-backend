import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
const PDFDocument = require('pdfkit-table');
// const jsPDF = require('jspdf');
// import jsPDF from 'jspdf';
// import { jsPDF } from 'jspdf';
const jsPDF = require('jspdf').jsPDF;
import 'jspdf-autotable';

import { readFileSync } from 'fs';
import { FindManyOptions, FindOneOptions, In, Like } from 'typeorm';

import {
  ConditionUnitEnum,
  IJwtUser,
  LocationEnum,
  PropertyStatusEnum,
  PropertyTypeEnum,
  StatusPublishEnum,
  PropertiesDB,
} from 'src/common';

import { PropertiesDTO } from './dto/request.dto';
// import { MasterPropertiesService } from 'apps/master/src/modules/properties/properties.service';

import { ReqCreatePropertyDTO, ReqUpdatePropertyDTO } from './dto/request.dto';
import { ResProperty } from './dto/response.dto';
import { mapDbToResDetail, mapDbToResList } from './mappings/view.mapping';
import { mapReqCreateToDb, mapReqUpdateToDB } from './mappings/upsert.mapping';
import { ReqCreateUnitDTO } from '../units/dto/request.dto';
import { DashboardUnitsService } from '../units/units.service';
import { DashboardPropertiesRepository } from './properties.repository';

@Injectable()
export class DashboardPropertiesService {
  constructor(
    private readonly repository: DashboardPropertiesRepository,
    private readonly unitService: DashboardUnitsService,
  ) {}

  private rootPath = __dirname.replace(
    'dist/modules/dashboard/properties',
    'public/image-jap-main',
  );

  async get(property_id: number): Promise<ResProperty> {
    const query: FindOneOptions<PropertiesDB> = {
      where: {
        property_id,
      },
      relations: {
        units: true,
        images: true,
      },
    };

    const property = await this.repository.findOne(query);
    return property ? await mapDbToResDetail(property) : null;
  }

  async getList(
    props: PropertiesDTO,
  ): Promise<{ data: ResProperty[]; count: number }> {
    // initiate empty where query
    let query: FindManyOptions<PropertiesDB> = {
      where: {},
      order: {
        created_at: 'desc',
      },
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

  async convertFromExcelToDb() {
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

  async generatePDFComparisson(property_id: number[]): Promise<Buffer> {
    return new Promise(async (resolve) => {
      const query: FindManyOptions<PropertiesDB> = {
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
          property_id: In(property_id),
        },
        relations: {
          units: true,
          images: true,
        },
      };

      const getData = await this.repository.find(query);

      const buffers: any[] = [];
      const doc = new PDFDocument({
        margin: 30,
        width: 300,
        size: 'A4',
        layout: 'landscape',
      });

      const properties: any = getData.map((dt) => {
        const size = dt.property_size ?? 0;
        const priceRent = dt.price_rent_sqm ?? 0;
        const serviceCharge = dt.service_charge ?? 0;

        const costTotal =
          priceRent > 0 ? size * (priceRent + serviceCharge) : 0;

        const negoRent = priceRent > 0 ? priceRent - 10000 : 0;
        const totalCostBargain =
          negoRent > 0 ? size * (negoRent + serviceCharge) : 0;

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
          bargain_tax:
            totalCostBargain > 0
              ? totalCostBargain * 0.11 + totalCostBargain
              : 0,
        };
      });

      const dataPerPage = 5;
      const page = Math.ceil(properties.length / dataPerPage);

      const coverImageWidth = 750; // lebar gambar yang diinginkan
      const coverImageHeight = 500; // tinggi gambar yang diinginkan

      const coverImageX = (doc.page.width - coverImageWidth) / 2;
      const coverImageY = (doc.page.height - coverImageHeight) / 2;

      doc.image(this.rootPath + '/cover.png', coverImageX, coverImageY, {
        width: coverImageWidth,
        height: coverImageHeight,
      });

      //tambah table
      for (let iTable = 0; iTable < page; iTable++) {
        doc.addPage();

        const headerImageX = doc.page.width - doc.page.margins.right - 150;
        const headerImageY = 20;
        doc.image(this.rootPath + '/logo-new.png', headerImageX, headerImageY, {
          width: 80,
          height: 40,
        });

        let databuilding: PropertiesDB[];

        if (iTable === 0) {
          databuilding = properties.slice(iTable, dataPerPage);
        } else {
          //pagination after page 1
          const start = iTable * dataPerPage;
          const end = start * dataPerPage;
          databuilding = properties.slice(start, end);
        }

        //row 1 building name
        const headers = [
          {
            label: 'Building',
            property: 'building',
            width: 110,
            headerColor: '#7f7f7f',
            headerOpacity: 2,
            headerAlign: 'center', // mengatur perataan horizontal header
            valign: 'center',
            options: { padding: 50 },
            renderer: (
              value,
              indexColumn,
              indexRow,
              row,
              rectRow,
              rectCell,
            ) => {
              if (indexRow === 0) {
                console.log('asas', rectCell.height);

                const imgWidth = rectCell.width; // atur agar sesuai dengan lebar cell
                const imgHeight = rectCell.height; // atur agar sesuai dengan tinggi cell

                // (Opsional) Hitung posisi agar image berada di tengah cell
                const xPos = rectCell.x + (rectCell.width - imgWidth) / 2;
                const yPos = rectCell.y + (rectCell.height - imgHeight) / 2;

                doc.image(this.rootPath + '/logo-jap.png', xPos, yPos, {
                  width: rectCell.width,
                  height: rectCell.height,
                });

                // return value;
                // return 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry,s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to';
              } else {
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
            headerAlign: 'center', // mengatur perataan horizontal header
            valign: 'center',
            options: { padding: 50 },
            renderer: (
              value,
              indexColumn,
              indexRow,
              row,
              rectRow,
              rectCell,
            ) => {
              if (indexRow === 0) {
                const imgWidth = rectCell.width; // atur agar sesuai dengan lebar cell
                const imgHeight = rectCell.height; // atur agar sesuai dengan tinggi cell

                // (Opsional) Hitung posisi agar image berada di tengah cell
                const xPos = rectCell.x + (rectCell.width - imgWidth) / 2;
                const yPos = rectCell.y + (rectCell.height - imgHeight) / 2;

                // Gambar image menggunakan instance doc (gunakan variabel global 'doc')
                doc.image(value, xPos, yPos, {
                  width: imgWidth,
                  height: imgHeight,
                });

                // return 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry,s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic';
              } else {
                const cellHeight = rectCell.height;
                const textHeight = doc.heightOfString(value, {
                  width: rectCell.width,
                });
                let yOffset = 0;

                // Tentukan offset vertikal berdasarkan valign
                if (row.valign === 'center') {
                  yOffset = (cellHeight - textHeight) / 2;
                } else if (row.valign === 'bottom') {
                  yOffset = cellHeight - textHeight;
                }

                if (indexRow >= 1 && indexRow <= 6) {
                  // Tulis teks dengan offset vertikal
                  doc.text(value, rectCell.x, rectCell.y + yOffset, {
                    width: rectCell.width,
                    align: row.align,
                  });
                } else {
                  if (indexRow !== 12) {
                    // Tulis teks dengan offset vertikal
                    doc.text(value, rectCell.x, rectCell.y + yOffset, {
                      width: rectCell.width - 10,
                      align: 'right',
                    });
                  }
                }
                return ''; // Mengembalikan string kosong untuk mencegah penulisan teks default
              }
            },
          });
        }

        //list cell 1
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

        //row 2 image building
        const row2 = databuilding.map((dt) => {
          return dt['image'];
        });

        //row 3 location
        const row3 = databuilding.map((dt) => {
          return dt.location;
        });

        //row 4 property size
        const row4 = databuilding.map((dt) => {
          return dt.property_size;
        });

        //row 5 total floor
        const row5 = databuilding.map((dt) => {
          return dt.total_floor;
        });

        //row 6 AC
        const row6 = databuilding.map((dt) => {
          return dt.price_overtime_ac;
        });

        //row 7 electricty
        const row7 = databuilding.map((dt) => {
          return dt.price_overtime_electricity;
        });

        //row 8 condition
        const row8 = databuilding.map((dt) => {
          return dt['condition'];
        });

        //row 9 rental rate
        const row9 = databuilding.map((dt) => {
          return 'Rp.   ' + dt.price_rent_sqm;
        });

        //row 10 service charge
        const row10 = databuilding.map((dt) => {
          return 'Rp.   ' + dt.service_charge;
        });

        //row 11 cost per month
        const row11 = databuilding.map((dt) => {
          return 'Rp.   ' + dt['cost_total'];
        });

        //row 12 cost per month after tax
        const row12 = databuilding.map((dt) => {
          // return 'bold:IDR ' + dt['cost_total_tax'];
          return 'bold:Rp.   ' + dt['cost_total_tax'];
        });

        //row 13 merge row
        const row13 = 'merge row';

        //row 14 judul estimation
        const row14 = '';

        //row 15 rental nego
        const row15 = databuilding.map((dt) => {
          return 'Rp.   ' + dt['nego_rent'];
        });

        //row 16 service charge nego
        const row16 = databuilding.map((dt) => {
          return 'Rp.   ' + dt.service_charge;
        });

        //row 17 total cost bargain
        const row17 = databuilding.map((dt) => {
          return 'Rp.   ' + dt['total_cost_bargain'];
        });

        //row 18 bargain after tax
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

        let textPositionYEstimateNego: number = 390;

        for (let iRow = 0; iRow < 17; iRow++) {
          // const element = array[index];

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
              } else if (iRow === 16) {
                Object.assign(data, {
                  [header.property]: rows[iRow][iHeader - 1],
                  options: {
                    backgroundColor: '#1f497d',
                    backgroundOpacity: 1,
                  },
                });
              } else {
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

        //color header : #7f7f7f
        //color kolom 1 #bfbfbf
        //color kolom 2 #d2dce4
        //color kolom tax #ff0066
        //color kolom bargain tax #1f497d

        doc.table(table, {
          x: 60, // horizontal
          y: 60, // vertical
          padding: [20, 5, 20, 5], // [top, right, bottom, left]
          prepareHeader: () => {
            doc.font('Helvetica-Bold').fontSize(10).fillColor('white');
            // .lineGap(5);
          },
          prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
            // Dapatkan posisi awal tabel
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

            if (
              indexColumn === 0 &&
              indexRow !== 0 &&
              indexRow !== 10 &&
              indexRow !== 16
            ) {
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
        const positionX =
          lengthHeaders == 6
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
          .text(
            'Estimation For Negotiation Price',
            positionX,
            textPositionYEstimateNego,
          );
      }

      doc.addPage();

      const coverBackImageWidth = 800; // lebar gambar yang diinginkan
      const coverBackImageHeight = 600; // tinggi gambar yang diinginkan

      const coverBackImageX = (doc.page.width - 820) / 2;
      const coverBackImageY = (doc.page.height - coverBackImageHeight) / 2;

      doc.image(
        this.rootPath + '/cover-back.png',
        coverBackImageX,
        coverBackImageY,
        {
          width: coverBackImageWidth,
          height: coverBackImageHeight,
        },
      );

      // Finalisasi PDF
      doc.end();

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
    });
  }
}
