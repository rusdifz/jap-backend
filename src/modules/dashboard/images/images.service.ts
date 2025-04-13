import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { readFileSync, existsSync, unlinkSync } from 'fs';

// import { MediaTypeEnum } from '@libs/common';
import { DashboardArticleService } from '../article/article.service';
import { AdminService } from '../admin/admin.service';
import { DashboardFeedbackService } from '../feedback/feedback.service';

import { DashboardImageRepository } from './images.repository';
import { mapInsertDB } from './mappings/upsert.mapping';
import { IMedia, MediaReferenceType } from 'src/common';

@Injectable()
export class DashboardImagesService {
  constructor(
    private readonly repository: DashboardImageRepository,
    private readonly articleService: DashboardArticleService,
    private readonly adminService: AdminService,
    private readonly feedbackService: DashboardFeedbackService,
  ) {}

  async uploadImages(
    files: Express.Multer.File[],
    reference_id: number,
    reference_type: MediaReferenceType,
  ): Promise<IMedia[]> {
    //check data dengan property id tersebut ada atau tidak, jika ada hapus semua

    console.log('befiore check');

    const checkDataExist = await this.repository.find({
      where: { reference_id, reference_type },
    });
    console.log('after check');

    if (checkDataExist.length > 0) {
      for (const exist of checkDataExist) {
        await this.repository.delete({ media_id: exist.media_id });

        const filePath = exist.path + '/' + exist.name;

        if (existsSync(filePath)) {
          console.log('exist lalu unlink', filePath);
          unlinkSync(filePath);
        }
      }
    }

    if (files.length > 0) {
      const resp = [];
      for (const file of files) {
        console.log('file ', file);

        const mapData = await mapInsertDB(file, reference_id, reference_type);
        console.log('map data', mapData);

        const saveData = await this.repository.save(mapData);

        if (reference_type !== MediaReferenceType.PROPERTY) {
          //update data profile, article and image
          //sebenernya ini buat make sure aja data urlnya sudah yang terbaru di masing2 image profile, article and feedback

          if (reference_type === MediaReferenceType.ARTICLE) {
            await this.articleService.updateImage(
              reference_id,
              mapData.full_url,
            );
          } else if (reference_type === MediaReferenceType.FEEDBACK) {
            await this.feedbackService.updateImage(
              reference_id,
              mapData.full_url,
            );
          } else {
            //user profile
            await this.adminService.updateImage(reference_id, mapData.full_url);
          }
        }

        resp.push(saveData);
      }

      return resp;
    }

    return null;
  }

  async uploaSingleImage(files: Express.Multer.File, property_id: number) {
    //check data dengan property id tersebut ada atau tidak, jika ada hapus semua
    // const checkDataExist = await this.repository.find({
    //   where: { property_id },
    // });
    // if (checkDataExist.length > 0) {
    //   for (const exist of checkDataExist) {
    //     await this.repository.delete({ media_id: exist.media_id });
    //     const filePath = exist.path + '/' + exist.name;
    //     if (existsSync(filePath)) {
    //       console.log('exist', filePath);
    //       unlinkSync(filePath);
    //     }
    //   }
    // }
    // if (files.length > 0) {
    //   const resp = [];
    //   for (const file of files) {
    //     const mapData = await mapInsertDB(file, property_id);
    //     const saveData = await this.repository.save(mapData);
    //     resp.push(saveData);
    //   }
    //   return resp;
    // }
    // return null;
  }

  async getImage(image_name: string): Promise<string> {
    const whitelist = ['.jpeg', '.jpg', '.png'];

    if (whitelist.includes(image_name)) {
      throw new HttpException('wrong file type', HttpStatus.BAD_REQUEST);
    }

    const getData = await this.repository.findOneBy({ name: image_name });

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
}
