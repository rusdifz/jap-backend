import { DataSource } from 'typeorm';
import { BaseRepository, ArticleDB } from '../../../common';
export declare class ClientArticleRepository extends BaseRepository<ArticleDB> {
    constructor(dataSource: DataSource);
}
