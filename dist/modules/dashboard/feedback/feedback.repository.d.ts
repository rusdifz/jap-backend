import { DataSource } from 'typeorm';
import { BaseRepository, FeedbackDB } from 'src/common';
export declare class DashboardFeedbackRepository extends BaseRepository<FeedbackDB> {
    constructor(dataSource: DataSource);
}
