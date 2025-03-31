import { ArticleDB } from 'src/common/entities';
import { ReqCreateArticleDTO, ReqUpdateArticleDTO } from '../dto/request.dto';
export declare function mapReqCreateToDB(payload: ReqCreateArticleDTO, username_login: string): Promise<Partial<ArticleDB>>;
export declare function mapReqUpdateToDB(payload: ReqUpdateArticleDTO, username_login: string): Promise<Partial<ArticleDB>>;
