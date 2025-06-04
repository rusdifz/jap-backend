import { ResDetail, ResList } from '../dto/response.dto';
import { ArticleDB } from '../../../../common/entities/article.entity';
export declare function mapDbToResDetail(db: ArticleDB, images_activity: any[]): Promise<ResDetail>;
export declare function mapDbToResList(db: ArticleDB[]): Promise<ResList[]>;
