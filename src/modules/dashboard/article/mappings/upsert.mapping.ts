import { ArticleDB } from 'src/common/entities';
import { ReqCreateArticleDTO, ReqUpdateArticleDTO } from '../dto/request.dto';

export async function mapReqCreateToDB(
  payload: ReqCreateArticleDTO,
  username_login: string,
): Promise<Partial<ArticleDB>> {
  return {
    title: payload.title,
    slug: payload['slug'],
    content: payload.content,
    thumbnail: payload.thumbnail,
    status_publish: payload.status_publish,
    created_by: username_login ?? 'admin system',
  };
}

export async function mapReqUpdateToDB(
  payload: ReqUpdateArticleDTO,
  username_login: string,
): Promise<Partial<ArticleDB>> {
  return {
    article_id: payload.article_id,
    title: payload.title,
    slug: payload['slug'],
    content: payload.content,
    thumbnail: payload.thumbnail,
    status_publish: payload.status_publish,
    updated_by: username_login ?? 'admin system',
  };
}
