import { Injectable } from '@nestjs/common';
import { DataSource, FindManyOptions, In, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseRepository, PropertiesDB, PropertyPicDB } from 'src/common';
// import { ReqGetPicListDTO } from './dto/request.dto';

@Injectable()
export class DashboardPropertiesRepository extends BaseRepository<PropertiesDB> {
  constructor(
    @InjectDataSource() dataSource: DataSource,
    @InjectRepository(PropertyPicDB)
    private picEntity: Repository<PropertyPicDB>,
  ) {
    super(PropertiesDB, dataSource);
  }

  // async findListPic(props: ReqGetPicListDTO) {
  //   let query: FindManyOptions<PropertyPicDB> = {
  //     where: {
  //       property_id: props.property_id,
  //     },
  //   };

  //   // sort & order query
  //   query = await this.sort(query, props);

  //   // pagination query
  //   query = await this.paginate(query, props);

  //   const findData = await this.picEntity.findAndCount(query);

  //   const resp = {
  //     data: findData[0],
  //     count: findData[1],
  //   };

  //   return resp;
  // }

  // async savePic(data: any) {
  //   return await this.picEntity.save(data);
  // }

  // async updatePic(data: any, pic_id: string) {
  //   return await this.picEntity.update({ id: pic_id }, data);
  // }

  // async deletePic(pic_id: string) {
  //   return await this.picEntity.delete({ id: pic_id });
  // }
}
