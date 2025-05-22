import { DataSource } from 'typeorm';
import { BaseRepository, ArticleDB } from 'src/common';
export declare class DashboardArticleRepository extends BaseRepository<ArticleDB> {
    constructor(dataSource: DataSource);
}
