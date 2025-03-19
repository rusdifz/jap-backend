import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { BaseRepository, FeedbackDB } from 'src/common';

@Injectable()
export class DashboardFeedbackRepository extends BaseRepository<FeedbackDB> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(FeedbackDB, dataSource);
  }
}
