import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { readFileSync, existsSync, unlinkSync } from 'fs';

// import { MediaTypeEnum } from '@libs/common';
import { DashboardImageRepository } from './images.repository';
import { mapInsertDB } from './mappings/upsert.mapping';

@Injectable()
export class DashboardImagesService {
  constructor(private readonly repository: DashboardImageRepository) {}

  async uploadImage(files: Express.Multer.File[], property_id: number) {
    //check data dengan property id tersebut ada atau tidak, jika ada hapus semua

    const checkDataExist = await this.repository.find({
      where: { property_id },
    });

    if (checkDataExist.length > 0) {
      for (const exist of checkDataExist) {
        await this.repository.delete({ media_id: exist.media_id });

        const filePath = exist.path + '/' + exist.name;

        if (existsSync(filePath)) {
          console.log('exist', filePath);
          unlinkSync(filePath);
        }
      }
    }

    if (files.length > 0) {
      const resp = [];
      for (const file of files) {
        const mapData = await mapInsertDB(file, property_id);
        const saveData = await this.repository.save(mapData);
        resp.push(saveData);
      }

      return resp;
    }

    return null;
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
}
