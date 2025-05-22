import { ArticleListDTO, ReqCreateArticleDTO, ReqUpdateArticleDTO } from './dto/request.dto';
import { ResDetail, ResList } from './dto/response.dto';
import { IJwtUser } from 'src/common';
import { DashboardArticleRepository } from './article.repository';
export declare class DashboardArticleService {
    private readonly repository;
    constructor(repository: DashboardArticleRepository);
    getDetail(article_id: number): Promise<ResDetail>;
    getList(props: ArticleListDTO): Promise<{
        data: ResList[];
        count: number;
    }>;
    create(body: ReqCreateArticleDTO, user: IJwtUser): Promise<ReqCreateArticleDTO>;
    update(body: ReqUpdateArticleDTO, user: IJwtUser): Promise<ReqUpdateArticleDTO>;
    delete(article_id: number, admin: IJwtUser): Promise<Object>;
    updateImage(article_id: number, thumbnail: string): Promise<import("typeorm").UpdateResult>;
}
