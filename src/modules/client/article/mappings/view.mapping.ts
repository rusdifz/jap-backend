import { dayjs } from '../../../../common/helpers';
import { ResDetail, ResList } from '../dto/response.dto';

import { ArticleDB } from '../../../../common/entities/article.entity';

export async function mapDbToResDetail(db: ArticleDB): Promise<ResDetail> {
  return {
    slug: db.slug,
    content: db.content,
    title: db.title,
    thumbnail: db.thumbnail,
    updated_at: dayjs(db.updated_at).format('MMMM D, YYYY'),
    created_by: db.created_by,
    updated_by: db.updated_by,
  };
}

export async function mapDbToResList(db: ArticleDB[]): Promise<ResList[]> {
  const res: ResList[] = db.map((dt) => {
    return {
      slug: dt.slug,
      title: dt.title,
      thumbnail: dt.thumbnail,
      updated_at: dayjs(dt.updated_at).format('D MMM YYYY'),
      created_by: dt.created_by,
    };
  });

  return res;
}
