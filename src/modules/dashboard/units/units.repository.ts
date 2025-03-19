import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { BaseRepository, PropertiesDB, UnitsDB } from 'src/common';

@Injectable()
export class DashboardUnitsRepository extends BaseRepository<UnitsDB> {
  constructor(
    @InjectDataSource() dataSource: DataSource,
    @InjectRepository(PropertiesDB)
    private readonly repoProperty: Repository<PropertiesDB>,
  ) {
    super(UnitsDB, dataSource);
  }

  async updateTotalUnitProperties(property_id: number, currentUnitTotal: any) {
    return await this.repoProperty.update(
      { property_id },
      { total_unit: currentUnitTotal },
    );
  }
}
