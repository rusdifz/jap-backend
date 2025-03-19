import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { FeedbackDB, BaseRepository } from 'src/common';

@Injectable()
export class ClientFeedbackRepository extends BaseRepository<FeedbackDB> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(FeedbackDB, dataSource);
  }
}
