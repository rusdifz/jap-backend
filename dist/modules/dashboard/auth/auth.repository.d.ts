import { BaseRepository, UsersDB } from 'src/common';
import { DataSource } from 'typeorm';
export declare class AuthRepository extends BaseRepository<UsersDB> {
    constructor(dataSource: DataSource);
}
