import { ArticleListDTO } from './dto/response.dto';
import { ResDetail, ResList } from './dto/response.dto';
import { ClientArticleRepository } from './article.repository';
export declare class ClientArticleService {
    private readonly repository;
    constructor(repository: ClientArticleRepository);
    getDetail(article_id: number): Promise<ResDetail>;
    getList(props: ArticleListDTO): Promise<{
        data: ResList[];
        count: number;
    }>;
}
