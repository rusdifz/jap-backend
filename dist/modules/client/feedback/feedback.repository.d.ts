import { DataSource } from 'typeorm';
import { FeedbackDB, BaseRepository } from 'src/common';
export declare class ClientFeedbackRepository extends BaseRepository<FeedbackDB> {
    constructor(dataSource: DataSource);
}
