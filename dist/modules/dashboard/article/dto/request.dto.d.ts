import { StatusPublishEnum, PaginationDTO } from 'src/common';
export declare class ArticleListDTO extends PaginationDTO {
    search_keyword?: string;
}
export declare class ReqCreateArticleDTO {
    title: string;
    content: string;
    thumbnail: string;
    status_publish: StatusPublishEnum;
}
export declare class ReqUpdateArticleDTO extends ReqCreateArticleDTO {
    article_id: number;
}
