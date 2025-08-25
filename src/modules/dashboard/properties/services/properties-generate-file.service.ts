import { Injectable } from '@nestjs/common';
const PDFDocument = require('pdfkit-table');
// import PDFDocument from 'pdfkit';
const PDFDocumentHolland = require('@hollandjake/pdfkit-table');
import axios from 'axios';

import { existsSync, mkdirSync } from 'fs';
import { FindManyOptions, FindOneOptions, In } from 'typeorm';

import { IJwtUser, PropertiesDB, UnitsDB } from 'src/common';

import { DashboardPropertiesRepository } from '../properties.repository';
import { formatCurrency } from 'src/common/helpers/currency.helper';
import { PdfComparisonDTO, PdfDetailDTO } from '../dto/request.dto';
import { DashboardUnitsService } from '../../units/units.service';

@Injectable()
export class DashboardPropertiesGenerateFileService {
  constructor(
    private readonly repository: DashboardPropertiesRepository,
    private readonly unitService: DashboardUnitsService,
  ) {}

  // private rootPathImageJAP = __dirname.replace(
  //   'dist/modules/dashboard/properties/services',
  //   'public/images/main',
  // );

  async generatePDFComparisson(
    propertiesData: PdfComparisonDTO,
    admin: IJwtUser,
  ): Promise<Buffer> {
    return new Promise(async (resolve, reject) => {
      try {
        const queryUnit: FindManyOptions<UnitsDB> = {
          select: {
            unit_id: true,
            size: true,
            condition: true,
            floor: true,
            rent_price: true,
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
              thumbnail: true,
              service_charge_price: true,
              ac_info: true,
              electricity_info: true,
              lighting_info: true,
              parking_charge_reserved_car: true,
              parking_charge_unreserved_car: true,
            },
          },
          where: {
            unit_id: In(propertiesData.unit_id),
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

        const buffers: any[] = [];
        const doc = new PDFDocument({
          margin: 30,
          width: 300,
          size: 'A4',
          layout: 'landscape',
        });

        const propertiesNew: any = getData.map((dt) => {
          let size = parseFloat(dt.size) ?? dt.property.property_size ?? 0;

          const priceRent = parseFloat(dt.rent_price.toString()) ?? 0;
          const serviceCharge =
            parseFloat(dt.property.service_charge_price.toString()) ?? 0;
          const costTotal =
            priceRent > 0 ? size * (priceRent + serviceCharge) : 0;

          return {
            unit_id: dt.unit_id,
            name: dt.property.name,
            image: dt.property.thumbnail ?? '',
            // image:
            //   (dt.property.thumbnail ?? dt.property.images.length > 0)
            //     ? dt.property.images[0].full_url
            //     : '',
            location: dt.property.location,
            property_size: size === 0 ? 'TBA' : size,
            total_floor: dt.floor ?? 'TBA',
            price_overtime_ac: dt.property.ac_info ?? 'TBA',
            price_overtime_electricity: dt.property.electricity_info ?? 'TBA',
            condition: dt.condition ?? 'Bare',
            price_rent_sqm: formatCurrency(priceRent),
            service_charge: formatCurrency(serviceCharge),
            cost_total: formatCurrency(costTotal),
            cost_total_tax:
              costTotal > 0
                ? formatCurrency(costTotal * 1.1)
                : formatCurrency(0),
            parking_reserved_car:
              formatCurrency(dt.property.parking_charge_reserved_car) +
              ' Per Year',
            parking_unreserved_car:
              formatCurrency(dt.property.parking_charge_reserved_car) +
              ' Per Year',
          };
        });

        const dataPerPage = 5;
        const page = Math.ceil(propertiesNew.length / dataPerPage);

        const coverImageWidth = 750; // lebar gambar yang diinginkan
        const coverImageHeight = 500; // tinggi gambar yang diinginkan

        const coverImageX = (doc.page.width - coverImageWidth) / 2;
        const coverImageY = (doc.page.height - coverImageHeight) / 2;

        const [
          coverImage,
          logo,
          logoNew,
          noImage,
          coverBack,
          whiteImage,
          footerImage,
          // imageBuilding,
        ] = await Promise.all([
          this.fetchImage(
            'https://res.cloudinary.com/servicebizimage/image/upload/v1748412406/cover_aftuu4.png',
          ),
          this.fetchImage(
            'https://res.cloudinary.com/servicebizimage/image/upload/v1748412837/logo-jap_phsabu.png',
          ),
          this.fetchImage(
            'https://res.cloudinary.com/servicebizimage/image/upload/v1748412838/logo-new_hk3vvn.png',
          ),
          this.fetchImage(
            'https://res.cloudinary.com/servicebizimage/image/upload/v1748412837/no-image_bnkobg.jpg',
          ),
          this.fetchImage(
            'https://res.cloudinary.com/servicebizimage/image/upload/v1748412838/cover-back_owp7gd.png',
          ),
          this.fetchImage(
            'https://res.cloudinary.com/servicebizimage/image/upload/v1748412836/white_amk5jh.jpg',
          ),
          this.fetchImage(
            'https://res.cloudinary.com/servicebizimage/image/upload/v1748412838/footer_yzecvl.png',
          ),
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
            width: 150, // Lebar maksimum teks
          });

        doc
          .font('Helvetica-Bold')
          .fontSize(6)
          .fillColor('#000000')
          .text('World Trade Centre, WTC 5, Lt. 11,', 580, 460, {
            align: 'left',
            width: 150, // Lebar maksimum teks
          });

        doc
          .text(
            'Jl. Jend Sudirman Kav. 29-31, Kel. Karet, Setiabudi, Jakarta Selatan -',
            580,
            470,
            {
              align: 'left',
              width: 300, // Lebar maksimum teks
            },
          )
          .font('Helvetica-Bold')
          .fontSize(6)
          .fillColor('#000000');
        doc
          .text('DKl Jakarta, 12920', 580, 480, {
            align: 'left',
            width: 300, // Lebar maksimum teks
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
            width: 300, // Lebar maksimum teks
          });

        doc
          .font('Helvetica-Bold')
          .fontSize(6)
          .fillColor('#000000')
          .text('E    : info@jardineasiapasific.asia', 580, 500, {
            align: 'left',
            width: 300, // Lebar maksimum teks
          });

        doc
          .font('Helvetica-Bold')
          .fontSize(6)
          .fillColor('#000000')
          .text('W    : jardineasiapasific.asia', 580, 510, {
            align: 'left',
            width: 300, // Lebar maksimum teks
          });

        //tambah table

        for (let iTable = 0; iTable < page; iTable++) {
          doc.addPage();

          const headerImageX = doc.page.width - doc.page.margins.right - 150;
          const headerImageY = 20;

          doc.image(logoNew, headerImageX, headerImageY, {
            width: 80,
            height: 40,
          });

          let databuilding: any[];

          if (iTable === 0) {
            databuilding = propertiesNew.slice(iTable, dataPerPage);
          } else {
            //pagination after page 1
            const start = iTable * dataPerPage;
            const end = start + dataPerPage;

            databuilding = propertiesNew.slice(start, end);
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
                  const imgWidth = rectCell.width; // atur agar sesuai dengan lebar cell
                  const imgHeight = rectCell.height; // atur agar sesuai dengan tinggi cell

                  // (Opsional) Hitung posisi agar image berada di tengah cell
                  const xPos = rectCell.x + (rectCell.width - imgWidth) / 2;
                  const yPos = rectCell.y + (rectCell.height - imgHeight) / 2;

                  doc.image(logo, xPos, yPos, {
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
            let image = noImage;

            if (dt.image) {
              image = await this.fetchImage(dt.image);
            }

            headers.push({
              label: dt.name,
              property: dt.name + '-' + dt.unit_id,
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

                  doc.image(image, xPos, yPos, {
                    width: imgWidth,
                    height: imgHeight,
                  });
                  // }
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
            'bold:Parking',
            'bold:Reserved',
            'bold:Unreserved',
            'bold:Comment',
            // 'bold:Total Cost Bargain',
            // 'bold:Bargain After Tax',
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
            return dt.price_rent_sqm;
          });

          //row 10 service charge
          const row10 = databuilding.map((dt) => {
            return dt.service_charge;
          });

          //row 11 cost per month
          const row11 = databuilding.map((dt) => {
            return dt['cost_total'];
          });

          //row 12 cost per month after tax
          const row12 = databuilding.map((dt) => {
            return 'bold:' + dt['cost_total_tax'];
          });

          //row 13 merge row
          const row13 = 'merge row';

          //row 14 judul estimation
          const row14 = '';

          //row 15 parking reserved car
          const row15 = databuilding.map((dt) => {
            return dt.parking_reserved_car;
          });

          //row 16 parking unreserved car
          const row16 = databuilding.map((dt) => {
            return dt.parking_unreserved_car;
          });

          //row 17 comment
          const row17 = '';

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
          ];

          let textPositionYParking: number = 385;
          let textPositionYComment: number = 437;
          for (let iRow = 0; iRow < 16; iRow++) {
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
                  if (rows[iRow][iHeader - 1].length > 25) {
                    textPositionYParking = 390;
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
              if (indexRow === 12 || indexRow === 15) {
                doc.addBackground(rectRow, '#7f7f7f', 1);
              }
              // if (indexRow === 16) {
              //   doc.font('Helvetica').fontSize(9).fillColor('white');
              // }
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

          doc.image(
            whiteImage,
            180,
            doc.page.height - doc.page.margins.bottom - 70,
            {
              width: 120,
              height: 30,
            },
          );

          const lengthHeaders = headers.length;
          const positionX =
            lengthHeaders == 6
              ? 380
              : lengthHeaders == 5
                ? 320
                : lengthHeaders == 4
                  ? 250
                  : 180;

          doc
            .font('Helvetica-Bold')
            .fontSize(15)
            .fillColor('white')
            .text('Parking', positionX, textPositionYParking);

          doc
            .font('Helvetica-Bold')
            .fontSize(15)
            .fillColor('white')
            .text('Comment', positionX, textPositionYComment);
        }

        doc.addPage();

        const coverBackImageWidth = 800; // lebar gambar yang diinginkan
        const coverBackImageHeight = 600; // tinggi gambar yang diinginkan

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

        const firstName = admin.user.first_name ?? '';
        const lastName = admin.user.last_name ?? '';
        const adminName = firstName + lastName;

        doc
          .font('Helvetica-Bold')
          .fontSize(10)
          .fillColor('#000000')
          .text(adminName !== '' ? adminName : admin.user.username, 89, 200, {
            align: 'left',
            width: 150, // Lebar maksimum teks
          });

        doc
          .font('Helvetica')
          .fontSize(10)
          .fillColor('#000000')
          .text(admin.user.phone_number ?? '+62 ', 89, 230, {
            align: 'left',
            width: 150, // Lebar maksimum teks
          });

        doc
          .font('Helvetica')
          .fontSize(10)
          .fillColor('#000000')
          .text(admin.user.email, 89, 245, {
            align: 'left',
            width: 150, // Lebar maksimum teks
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
            width: 150, // Lebar maksimum teks
          });

        doc
          .font('Helvetica-Bold')
          .fontSize(7)
          .fillColor('#000000')
          .text('World Trade Centre, WTC 5, Lt. 11,', 500, 273, {
            align: 'left',
            width: 150, // Lebar maksimum teks
          });

        doc
          .text(
            'Jl. Jend Sudirman Kav. 29-31, Kel. Karet, Setiabudi, Jakarta Selatan -',
            500,
            286,
            {
              align: 'left',
              width: 300, // Lebar maksimum teks
            },
          )
          .font('Helvetica-Bold')
          .fontSize(7)
          .fillColor('#000000');
        doc
          .text('DKl Jakarta, 12920', 500, 299, {
            align: 'left',
            width: 300, // Lebar maksimum teks
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
            width: 300, // Lebar maksimum teks
          });

        doc
          .font('Helvetica-Bold')
          .fontSize(7)
          .fillColor('#000000')
          .text('E    : info@jardineasiapasific.asia', 500, 325, {
            align: 'left',
            width: 300, // Lebar maksimum teks
          });

        doc
          .font('Helvetica-Bold')
          .fontSize(7)
          .fillColor('#000000')
          .text('W    : jardineasiapasific.asia', 500, 338, {
            align: 'left',
            width: 300, // Lebar maksimum teks
          });

        // Finalisasi PDF
        doc.end();

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
      } catch (error) {
        reject(error);
      }
    });
  }

  async generatePDFDetailProperty(
    propertiesData: PdfDetailDTO,
  ): Promise<Buffer> {
    return new Promise(async (resolve, reject) => {
      try {
        const buffers: any[] = [];
        let doc = new PDFDocumentHolland({
          margin: 20,
          width: 1200,
          height: 2000,
        });

        for (const [
          index,
          property,
        ] of propertiesData.properties_download.entries()) {
          if (property.unit_id.length > 0) {
            const query: FindManyOptions<PropertiesDB> = {
              where: {
                property_id: property.property_id,
                units: {
                  unit_id: In(property.unit_id),
                },
              },
              relations: {
                units: true,
                images: true,
              },
            };

            const getData = await this.repository.findOne(query);

            const [logoNew, footerImage] = await Promise.all([
              this.fetchImage(
                'https://res.cloudinary.com/servicebizimage/image/upload/v1748412838/logo-new_hk3vvn.png',
              ),
              this.fetchImage(
                'https://res.cloudinary.com/servicebizimage/image/upload/v1748412838/footer2_s7vkbt.png',
              ),
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
              const logo = await this.fetchImage(getData.thumbnail);

              doc.image(logo, 25, 70, {
                width: 138,
                height: 188,
              });
            }

            let address: any = getData.location;

            if (getData.address) {
              // 1. Cari posisi "Jl"
              const start = getData.address.toLowerCase().indexOf('jl');

              if (start !== -1) {
                // 2. Cari koma pertama setelah posisi tersebut
                const end = getData.address.indexOf(',', start);

                // 3. Ambil substring dari "Jl" hingga sebelum koma
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
            // Data dinamis (contoh: array of rows)
            let dynamicRows: any = [
              // Header 1
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
              // Header
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
              // Sub-header
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
                const rentalPrice = unit.rent_price;
                const serviceCharge = getData.service_charge_price;

                const priceMonth =
                  (parseFloat(rentalPrice.toString()) +
                    parseFloat(serviceCharge.toString())) *
                  parseFloat(size);

                dynamicRows.push({
                  content: [
                    unit.floor,
                    unit.size,
                    formatCurrency(rentalPrice),
                    formatCurrency(serviceCharge),
                    formatCurrency(priceMonth),
                    unit.condition,
                  ],
                });
              }
            }

            // Buat tabel dengan konfigurasi dasar
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

            // Loop untuk row dinamis
            dynamicRows.forEach((rowConfig) => {
              table.row(
                rowConfig.content,
                rowConfig.styles || {}, // Optional styles
              );
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
                //   cellWidth: widthCell,
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
              .row(
                [
                  {
                    value: 'Deposit',
                    colspan: 3,
                  },
                  {
                    value: 'Overtime Charges',
                    rowspan: 2,
                    colspan: 2,
                  },
                ],
                {
                  fontSize: fontSizeHeader,
                  backgroundColor: '#1f497d',
                  textColor: 'white',
                },
              )
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
                //   height: 80,
                cellHeight: heightCell,
                //   cellWidth: widthCell,
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
              .row(
                [
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
                ],
                {
                  fontSize: fontSizeHeader,
                  backgroundColor: '#1f497d',
                  textColor: 'white',
                },
              )
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
                //   height: 60,
                cellHeight: heightCell,
                //   cellWidth: widthCell,
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
              .row(
                [
                  {
                    value: 'Building Spesification',
                    colspan: 6,
                    align: { x: 'center', y: 'bottom' },
                  },
                ],
                {
                  fontSize: fontSizeHeaderBlack,
                  backgroundColor: '#f0f2f5',
                  textColor: 'black',
                  textStroke: '0.5px',
                },
              )
              .row(
                [
                  'Number of Floor',
                  'Lift',
                  'Celling Height',
                  'Typical Floor Size',
                  'Total Semi Gross Area',
                  'Power Back Up',
                ],
                {
                  fontSize: fontSizeHeader,
                  backgroundColor: '#1f497d',
                  textColor: 'white',
                },
              )
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
                //   height: 40,
                cellHeight: 30,
                //   widthCell: widthCell,
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
              .row(
                [
                  'Loading Capacity (typical)',
                  {
                    value: 'Telecommunication',
                    colspan: 3,
                  },
                  {
                    value: 'Fire Safety',
                    colspan: 3,
                  },
                ],
                {
                  fontSize: fontSizeHeader,
                  backgroundColor: '#1f497d',
                  textColor: 'white',
                },
              )
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
                //   height: 40,
                cellHeight: heightCell,
                //   cellWidth: widthCell,
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
                //   height: 50,
                cellHeight: heightCell,
                //   cellWidth: widthCell,
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
              .row(
                [
                  {
                    value: 'General Information',
                    colspan: 7,
                    align: { x: 'center', y: 'bottom' },
                  },
                ],
                {
                  fontSize: fontSizeHeaderBlack,
                  backgroundColor: '#f0f2f5',
                  textColor: 'black',
                  textStroke: '0.5px',
                },
              )
              .row(
                [
                  'Office Hour',
                  'Time',
                  'Building Complition',
                  'Occupancy rate',
                  {
                    value: 'Amenities',
                    colspan: 3,
                  },
                ],
                {
                  fontSize: fontSizeHeader,
                  backgroundColor: '#1f497d',
                  textColor: 'white',
                },
              )
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

            console.log('index', index);
            console.log('asas', propertiesData.properties_download.length);

            if (index + 1 !== propertiesData.properties_download.length) {
              doc.addPage();
            }
          }
        }

        // Finalisasi PDF
        doc.end();

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
      } catch (error) {
        reject(error);
      }
    });
  }

  async fetchImage(src) {
    const image = await axios.get(src, {
      responseType: 'arraybuffer',
    });

    return image.data;
  }
}
