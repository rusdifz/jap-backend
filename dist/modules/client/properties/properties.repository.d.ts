import { DataSource } from 'typeorm';
import { BaseRepository, PropertiesDB } from 'src/common';
export declare class ClientPropertiesRepository extends BaseRepository<PropertiesDB> {
    constructor(dataSource: DataSource);
}
