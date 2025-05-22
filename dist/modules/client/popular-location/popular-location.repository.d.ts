import { DataSource } from 'typeorm';
import { BaseRepository, MasterLocationDB } from 'src/common';
export declare class PopularLocationsRepository extends BaseRepository<MasterLocationDB> {
    constructor(dataSource: DataSource);
}
