import { ArticleDB } from 'src/common';
import { ResDetail, ResList } from '../dto/response.dto';
export declare function mapDbToResDetail(db: ArticleDB, images_activity: any[]): Promise<ResDetail>;
export declare function mapDbToResList(db: ArticleDB[]): Promise<ResList[]>;
