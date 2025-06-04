import { ArticleListDTO } from './dto/response.dto';
import { ResDetail, ResList } from './dto/response.dto';
import { ClientArticleRepository } from './article.repository';
import { DashboardImagesService } from 'src/modules/dashboard/images/images.service';
export declare class ClientArticleService {
    private readonly repository;
    private readonly imageService;
    constructor(repository: ClientArticleRepository, imageService: DashboardImagesService);
    getDetail(slug: string): Promise<ResDetail>;
    getList(props: ArticleListDTO): Promise<{
        data: ResList[];
        count: number;
    }>;
}
