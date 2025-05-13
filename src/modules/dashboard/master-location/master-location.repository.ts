import { Injectable } from '@nestjs/common';
import { DataSource, FindManyOptions, In } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { BaseRepository, MasterLocationDB } from 'src/common';

@Injectable()
export class DashboardMasterLocationsRepository extends BaseRepository<MasterLocationDB> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(MasterLocationDB, dataSource);
  }
}
