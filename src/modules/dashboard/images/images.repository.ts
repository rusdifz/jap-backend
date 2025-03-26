import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { BaseRepository, MediaDB } from 'src/common';

@Injectable()
export class DashboardImageRepository extends BaseRepository<MediaDB> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(MediaDB, dataSource);
  }
}
