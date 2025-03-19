import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { BaseRepository, ArticleDB } from '../../../common';

@Injectable()
export class ClientArticleRepository extends BaseRepository<ArticleDB> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(ArticleDB, dataSource);
  }
}
