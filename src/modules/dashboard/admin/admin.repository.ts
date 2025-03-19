import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { BaseRepository, UsersDB } from 'src/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AdminRepository extends BaseRepository<UsersDB> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(UsersDB, dataSource);
  }
}
