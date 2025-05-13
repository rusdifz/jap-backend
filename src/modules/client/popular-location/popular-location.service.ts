import { Injectable } from '@nestjs/common';

import { PopularLocationsRepository } from './popular-location.repository';
import { FindManyOptions } from 'typeorm';
import { MasterLocationDB } from 'src/common';
import { mapDbToResList } from './mappings/view.mapping';
import { ResLocation } from './dto/response.dto';

@Injectable()
export class PopularLocationService {
  constructor(private repository: PopularLocationsRepository) {}

  async getList(): Promise<{ data: ResLocation[]; count: number }> {
    const query: FindManyOptions<MasterLocationDB> = {
      where: {
        activate_home: true,
      },
      order: {
        position: 'ASC',
      },
      take: 6,
      skip: 0,
    };

    const findData = await this.repository.findAndCount(query);

    const respData =
      findData.length > 0 ? await mapDbToResList(findData[0]) : [];

    return { data: respData, count: findData[1] };
  }
}
