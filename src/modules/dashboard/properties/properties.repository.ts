import { Injectable } from '@nestjs/common';
import { DataSource, FindManyOptions, In } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { BaseRepository, PropertiesDB } from 'src/common';

@Injectable()
export class DashboardPropertiesRepository extends BaseRepository<PropertiesDB> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(PropertiesDB, dataSource);
  }
}
