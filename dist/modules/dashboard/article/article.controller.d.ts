import { ArticleListDTO } from './dto/request.dto';
import { ReqCreateArticleDTO, ReqUpdateArticleDTO } from './dto/request.dto';
import { IJwtUser } from 'src/common';
import { DashboardArticleService } from './article.service';
export declare class DashboardArticleController {
    private readonly service;
    constructor(service: DashboardArticleService);
    getDetail(id: string): Promise<import("./dto/response.dto").ResDetail>;
    getList(query: ArticleListDTO): Promise<{
        data: import("./dto/response.dto").ResList[];
        count: number;
    }>;
    create(user: IJwtUser, body: ReqCreateArticleDTO): Promise<ReqCreateArticleDTO>;
    update(user: IJwtUser, bodyparam: ReqUpdateArticleDTO): Promise<ReqUpdateArticleDTO>;
    deleteOne(user: IJwtUser, id: string): Promise<Object>;
}
