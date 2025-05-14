import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FindManyOptions, Not } from 'typeorm';

import { IJwtUser, UnitsDB } from 'src/common';
import { UnitListDTO } from './dto/request.dto';
import { ResUnit } from './dto/response.dto';

// import { mapDbToResDetail, mapDbToResList } from './mappings/view.mapping';
import { ReqCreateUnitDTO, ReqUpdateUnitDTO } from './dto/request.dto';
import { mapReqCreateToDB, mapReqUpdateToDB } from './mappings/upsert.mapping';

import { DashboardUnitsRepository } from './units.repository';

import { DashboardPropertiesService } from '../properties/services/properties.service';

@Injectable()
export class DashboardUnitsService {
  constructor(
    private readonly repository: DashboardUnitsRepository,
    // private readonly propertyService: DashboardPropertiesService,
  ) {}

  async getDetail(unit_id: string): Promise<ResUnit> {
    const unit = await this.repository.findOneBy({ unit_id });

    return unit ? plainToInstance(ResUnit, unit, {}) : null;
  }

  async getList(
    props: UnitListDTO,
  ): Promise<{ data: ResUnit[]; count: number }> {
    // initiate empty where query
    let query: FindManyOptions<UnitsDB> = {
      where: {},
      order: {
        created_at: 'DESC',
      },
    };

    // sort & order query
    query = await this.repository.sort(query, props);

    // pagination query
    query = await this.repository.paginate(query, props);

    if (props.property_id) {
      Object.assign(query.where, { property_id: props.property_id });
    }

    const searchData = await this.repository.findAndCount(query);

    let units = [];

    if (searchData[0].length) {
      units = searchData[0].map((unit) => {
        const mapData = plainToInstance(ResUnit, unit, {});

        return mapData;
      });
    }

    return {
      data: units,
      count: searchData[1],
    };
  }

  async create(
    body: ReqCreateUnitDTO,
    admin: IJwtUser,
  ): Promise<ReqCreateUnitDTO> {
    const unit = await mapReqCreateToDB(body, admin);

    const saveData = await this.repository.save(unit);
    body['unit_id'] = saveData.unit_id;

    // await this.propertyService.updateTotalUnit(unit.property_id);
    await this.updateTotalUnit(unit.property_id);
    return body;
  }

  async update(body: ReqUpdateUnitDTO, admin: IJwtUser): Promise<any> {
    const unit = await mapReqUpdateToDB(body, admin);

    await this.repository.update({ unit_id: unit.unit_id }, unit);
    // await this.propertyService.updateTotalUnit(unit.property_id);
    await this.updateTotalUnit(unit.property_id);
    return body;
  }

  async delete(unit_id: string, admin: IJwtUser): Promise<Object> {
    const remove = await this.repository.softDelete({ unit_id });

    // this.propertyService.decreaseTotalUnit(unit_id);
    this.decreaseTotalUnit(unit_id);
    if (remove.affected > 0) {
      await this.repository.update(
        { unit_id },
        { deleted_by: admin?.user?.username ?? 'system' },
      );
    }
    return remove;
  }

  async updateTotalUnit(property_id: number): Promise<number> {
    const currentUnitTotal = await this.countUnitByPropertyId(property_id);

    await this.repository.updateTotalUnitProperties(
      property_id,
      currentUnitTotal,
    );

    return currentUnitTotal;
  }

  async decreaseTotalUnit(unit_id: string): Promise<number> {
    const searchDelete = await this.getDeleteData(unit_id);

    if (searchDelete) {
      const currentUnitTotal = await this.countUnitByPropertyId(
        searchDelete.property_id,
      );
      await this.repository.updateTotalUnitProperties(
        searchDelete.property_id,
        currentUnitTotal,
      );
      return currentUnitTotal;
    }

    return null;
  }

  async getDeleteData(unit_id: string): Promise<UnitsDB> {
    return await this.repository.findOneBy({ unit_id, deleted_at: Not(null) });
  }

  async countUnitByPropertyId(property_id: number): Promise<number> {
    return await this.repository.count({ where: { property_id } });
  }

  async findCustomOptions(
    options: FindManyOptions<UnitsDB>,
  ): Promise<UnitsDB[]> {
    return await this.repository.find(options);
  }
}
