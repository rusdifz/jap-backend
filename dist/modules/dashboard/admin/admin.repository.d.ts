import { BaseRepository, UsersDB } from 'src/common';
import { DataSource } from 'typeorm';
export declare class AdminRepository extends BaseRepository<UsersDB> {
    constructor(dataSource: DataSource);
}
