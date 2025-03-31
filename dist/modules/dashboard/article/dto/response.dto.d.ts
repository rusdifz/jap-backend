import { IArticle, StatusPublishEnum } from 'src/common';
export declare class ResDetail implements Partial<IArticle> {
}
export declare class ResList implements Partial<IArticle> {
    article_id: number;
    title: string;
    thumbnail: string;
    status_publish?: StatusPublishEnum;
    created_at: Date;
    created_by: string;
}
