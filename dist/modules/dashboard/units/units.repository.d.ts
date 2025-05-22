import { DataSource, Repository } from 'typeorm';
import { BaseRepository, PropertiesDB, UnitsDB } from 'src/common';
export declare class DashboardUnitsRepository extends BaseRepository<UnitsDB> {
    private readonly repoProperty;
    constructor(dataSource: DataSource, repoProperty: Repository<PropertiesDB>);
    updateTotalUnitProperties(property_id: number, currentUnitTotal: any): Promise<import("typeorm").UpdateResult>;
}
