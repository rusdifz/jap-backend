import { DataSource } from 'typeorm';
import { BaseRepository, MasterLocationDB } from 'src/common';
export declare class DashboardMasterLocationsRepository extends BaseRepository<MasterLocationDB> {
    constructor(dataSource: DataSource);
}
