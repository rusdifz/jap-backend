import { DataSource } from 'typeorm';
import { BaseRepository, MediaDB } from 'src/common';
export declare class DashboardImageRepository extends BaseRepository<MediaDB> {
    constructor(dataSource: DataSource);
}
