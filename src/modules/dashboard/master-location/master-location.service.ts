import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions } from 'typeorm';

import { IJwtUser, MasterLocationDB, PaginationDTO } from 'src/common';
import {
  ReqCreateMasterLocationDTO,
  ReqUpdateMasterLocationDTO,
} from './dto/request.dto';
import { ResMasterLocation } from './dto/response.dto';
import { mapDbToResDetail, mapDbToResList } from './mappings/view.mapping';

import { DashboardMasterLocationsRepository } from './master-location.repository';

@Injectable()
export class DashboardMasterLocationService {
  constructor(private repository: DashboardMasterLocationsRepository) {}

  async create(
    data: ReqCreateMasterLocationDTO,
    admin: IJwtUser,
  ): Promise<ReqCreateMasterLocationDTO> {
    console.log('admin', admin);

    const mappingData: MasterLocationDB = {
      location_name: data.location_name,
      position: data.position,
      activate_home: data.activate_homepage,
      url_image: '',
      created_by: admin.user.username,
    };

    const saveData = await this.repository.save(mappingData);

    data['id'] = saveData.id;

    return data;
  }

  async update(
    data: ReqUpdateMasterLocationDTO,
    admin: IJwtUser,
  ): Promise<ReqUpdateMasterLocationDTO> {
    const mapData = {
      location_name: data.location_name,
      position: data.position,
      activate_home: data.activate_homepage,
      updated_by: admin.user.username,
    };

    await this.repository.update({ id: data.id }, mapData);

    return data;
  }

  async delete(id: number, admin: IJwtUser): Promise<Object> {
    const deleteData = await this.repository.update(
      { id },
      { deleted_by: admin?.user?.username ?? 'system' },
    );

    if (deleteData.affected > 0) {
      return {};
    }

    throw new Error('data master location ' + id + ' not deleted');
  }

  async getDetail(id: number): Promise<ResMasterLocation> {
    const query: FindOneOptions<MasterLocationDB> = {
      where: {
        id,
      },
    };

    const findData = await this.repository.findOne(query);

    return findData ? await mapDbToResDetail(findData) : null;
  }

  async getList(
    props: PaginationDTO,
  ): Promise<{ data: ResMasterLocation[]; count: number }> {
    let query: FindManyOptions = {};

    // sort & order query

    props.sort = 'position';
    props.order = 'asc';
    query = await this.repository.sort(query, props);

    // pagination query
    query = await this.repository.paginate(query, props);

    const findData = await this.repository.findAndCount(query);

    const respData =
      findData.length > 0 ? await mapDbToResList(findData[0]) : [];

    return { data: respData, count: findData[1] };
  }

  async updateImage(id: number, url_image: string) {
    console.log('id', id);
    console.log('url', url_image);
    const data = await this.repository.update({ id }, { url_image });
    console.log('data', data);

    return data;
  }

  async getListPosition() {
    // const search = await this.repository.find({})
  }
}
