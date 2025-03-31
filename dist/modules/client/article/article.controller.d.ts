import { ArticleListDTO } from './dto/response.dto';
import { ClientArticleService } from './article.service';
export declare class ClientArticleController {
    private readonly service;
    constructor(service: ClientArticleService);
    getDetail(id: string): Promise<import("./dto/response.dto").ResDetail>;
    getList(query: ArticleListDTO): Promise<{
        data: import("./dto/response.dto").ResList[];
        count: number;
    }>;
}
