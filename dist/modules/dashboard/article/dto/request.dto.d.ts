import { StatusPublishEnum, PaginationDTO } from 'src/common';
export declare class ArticleListDTO extends PaginationDTO {
    search_keyword?: string;
    status_publish: StatusPublishEnum;
}
export declare class ReqCreateArticleDTO {
    title: string;
    content: string;
    thumbnail: string;
    url_youtube: string;
    tags: string;
    status_publish: StatusPublishEnum;
}
export declare class ReqUpdateArticleDTO extends ReqCreateArticleDTO {
    article_id: number;
}
