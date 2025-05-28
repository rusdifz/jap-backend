import { StatusPublishEnum } from '../enums';
export declare class ArticleDB {
    article_id: number;
    title: string;
    slug: string;
    content: string;
    thumbnail: string;
    url_youtube: string;
    tags: string;
    status_publish: StatusPublishEnum;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    created_by?: string;
    updated_by?: string;
}
