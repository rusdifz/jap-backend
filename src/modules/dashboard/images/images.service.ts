import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { readFileSync, existsSync, unlinkSync } from 'fs';

import { CloudinaryFileService } from 'src/libs/cloudinary-file/cloudinary-file.service';

import { DashboardArticleService } from '../article/article.service';
import { AdminService } from '../admin/admin.service';
import { DashboardFeedbackService } from '../feedback/feedback.service';
import { DashboardMasterLocationService } from '../master-location/master-location.service';

import { DashboardImageRepository } from './images.repository';
import { mapInsertDB } from './mappings/upsert.mapping';
import {
  IMedia,
  LocationEnum,
  MediaReferenceType,
  PropertiesDB,
} from 'src/common';
import { ReqUploadImages } from './dto/request.dto';
import { DashboardPropertiesService } from '../properties/services/properties.service';
import { In, Not } from 'typeorm';

@Injectable()
export class DashboardImagesService {
  constructor(
    private readonly repository: DashboardImageRepository,
    private readonly articleService: DashboardArticleService,
    private readonly adminService: AdminService,
    private readonly feedbackService: DashboardFeedbackService,
    private readonly masterLocationService: DashboardMasterLocationService,
    private readonly cdnService: CloudinaryFileService,
  ) {}

  async uploadImages(body: ReqUploadImages): Promise<IMedia[]> {
    //check data dengan property id tersebut ada atau tidak, jika ada hapus semua

    console.log('before check', body);

    const queryDataExist = {
      reference_id: body.reference_id,
      reference_type: body.reference_type,
    };

    if (body.files_old) {
      const ids = body.files_old.split(/,/g);
      console.log('ids', ids);
      Object.assign(queryDataExist, { media_id: Not(In(ids)) });
    }

    console.log('query', queryDataExist);

    const checkDataExist = await this.repository.find({
      where: queryDataExist,
    });
    console.log('after check', checkDataExist.length);

    if (checkDataExist.length > 0) {
      for (const exist of checkDataExist) {
        await Promise.all([
          this.repository.delete({ media_id: exist.media_id }),
          this.cdnService.deleteFiled(exist.public_id), //delete on cloudinary with public id
        ]);
      }
    }

    console.log('check exist', checkDataExist);

    if (body.files.length > 0) {
      const resp = [];
      for (const file of body.files) {
        const folderName = `${body.reference_type}/${body.folder_name
          .toLowerCase()
          .replace(/,/g, '')
          .replace(/\s/g, '-')
          .replace('-&-', '-')}`;

        console.log('folder name', folderName);

        //upload to cloudinary
        const uploadFile = await this.cdnService.FileUpload(file, folderName);
        console.log('upload file', uploadFile);

        const mapData = await mapInsertDB(
          file,
          body.reference_id,
          body.reference_type,
          uploadFile,
        );
        console.log('map data', mapData);

        if (body.reference_type !== MediaReferenceType.PROPERTY_THUMBNAIL) {
          console.log('save data not thumbnail');

          const saveData = await this.repository.save(mapData);

          //selain type propety dan activity upload ke tabel masing2
          //update data profile, article and image
          //sebenernya ini buat make sure aja data urlnya sudah yang terbaru di masing2 image profile, article and feedback

          if (body.reference_type === MediaReferenceType.ARTICLE) {
            await this.articleService.updateImage(
              body.reference_id,
              mapData.full_url,
            );
          } else if (body.reference_type === MediaReferenceType.FEEDBACK) {
            await this.feedbackService.updateImage(
              body.reference_id,
              mapData.full_url,
            );
          } else if (
            body.reference_type === MediaReferenceType.MASTER_LOCATION
          ) {
            await this.masterLocationService.updateImage(
              body.reference_id,
              mapData.full_url,
            );
          } else if (body.reference_type === MediaReferenceType.USER) {
            //user profile

            await this.adminService.updateImage(
              body.reference_id,
              mapData.full_url,
            );
          }

          resp.push(saveData);
        } else {
          console.log('is thumbnail');

          resp.push(mapData);
        }
      }

      return resp;
    }

    return null;
  }

  async deleteData(param: string) {
    return await this.cdnService.deleteFiled(param);
  }

  async getImage(image_name: string): Promise<string> {
    const whitelist = ['.jpeg', '.jpg', '.png'];

    if (whitelist.includes(image_name)) {
      throw new HttpException('wrong file type', HttpStatus.BAD_REQUEST);
    }

    const getData = await this.repository.findOneBy({ public_id: image_name });

    if (getData) {
      // const path = __dirname
      // .toString()
      // .replace(
      //   'modules/dashboard/images',
      //   'public/images/' + property_slug + '/' + image_name,
      // );
      const path = getData.path + '/' + image_name;

      if (existsSync(path)) {
        return path;
      }
    }

    throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
  }

  async findImageJoin(
    reference_id: number,
    reference_type: MediaReferenceType,
  ) {
    return await this.repository.find({
      where: { reference_id, reference_type },
    });
  }

  async uploadImageBulk(properties: PropertiesDB[], type: MediaReferenceType) {
    //folder name

    //get image

    const paths = [
      'public/Lobby.png',
      'public/Lift.png',
      'public/Kantin.png',
      'public/Toilet.png',
    ];

    const resp = [];

    for (const property of properties) {
      const loc = property.location
        .toLowerCase()
        .replace(',', '')
        .replace(/[\s&]+/g, '-');
      console.log('loc', loc);

      const folderName = `${type}/${loc}/${property.property_id}`;
      console.log('folder', folderName);

      for (const pathFile of paths) {
        const imagesData: any = readFileSync(pathFile);
        // console.log('images', imagesData.buffer);

        const uploadFile = await this.cdnService.FileUpload(
          imagesData,
          folderName,
        );
        console.log('upload file', uploadFile);

        const mapData = await mapInsertDB(
          { mimetype: 'image/png' },
          property.property_id,
          type,
          uploadFile,
        );

        const saveData = await this.repository.save(mapData);

        resp.push(saveData);
      }
    }

    return resp;
  }

  async uploadImageThumbnailBulk(properties: PropertiesDB[]) {
    const resp = [];

    for (const property of properties) {
      console.log('pro', property);

      const folderPath = `public/building/${property.location}/${property.name}.png`;
      console.log('folder', folderPath);

      if (existsSync(folderPath)) {
        const loc = property.location
          .toLowerCase()
          .replace(',', '')
          .replace(/[\s&]+/g, '-');
        console.log('loc', loc);

        const folderName = `${MediaReferenceType.PROPERTY_THUMBNAIL}/${loc}/${property.property_id}`;
        console.log('folder', folderName);

        const imagesData: any = readFileSync(folderPath);

        const uploadFile = await this.cdnService.FileUpload(
          imagesData,
          folderName,
        );
        console.log('upload file', uploadFile);

        const mapData = await mapInsertDB(
          { mimetype: 'image/png' },
          property.property_id,
          MediaReferenceType.PROPERTY_THUMBNAIL,
          uploadFile,
        );

        resp.push(mapData);
      }
    }

    return resp;
  }
}
