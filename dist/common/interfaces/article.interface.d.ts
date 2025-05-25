import { ArticleDB } from '../entities/article.entity';
import { IMedia } from './media.interface';
export interface IArticle extends ArticleDB {
    images_activity?: IMedia[];
}
