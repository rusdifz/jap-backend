import { dayjs, ArticleDB } from 'src/common';
import { ResDetail, ResList } from '../dto/response.dto';

export async function mapDbToResDetail(db: ArticleDB): Promise<ResDetail> {
  return {
    article_id: Number(db.article_id),
    content: db.content,
    title: db.title,
    thumbnail: db.thumbnail,
    status_publish: db.status_publish,
    created_at: dayjs(db.created_at).format('MMMM D, YYYY'),
    updated_at: dayjs(db.updated_at).format('MMMM D, YYYY'),
    created_by: db.created_by,
    updated_by: db.updated_by,
  };
}

export async function mapDbToResList(db: ArticleDB[]): Promise<ResList[]> {
  const res: ResList[] = db.map((dt) => {
    return {
      article_id: Number(dt.article_id),
      title: dt.title,
      thumbnail: dt.thumbnail,
      status_publish: dt.status_publish,
      created_at: dayjs(dt.created_at).format('MMMM D, YYYY'),
      created_by: dt.created_by,
    };
  });

  return res;
}
