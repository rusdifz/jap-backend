import { DataSource, Repository } from 'typeorm';
import { BaseRepository, PropertiesDB, PropertyPicDB } from 'src/common';
export declare class DashboardPropertiesRepository extends BaseRepository<PropertiesDB> {
    private picEntity;
    constructor(dataSource: DataSource, picEntity: Repository<PropertyPicDB>);
}
