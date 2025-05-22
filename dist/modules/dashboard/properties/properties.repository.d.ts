import { DataSource } from 'typeorm';
import { BaseRepository, PropertiesDB } from 'src/common';
export declare class DashboardPropertiesRepository extends BaseRepository<PropertiesDB> {
    constructor(dataSource: DataSource);
}
