import { IArticle, StatusPublishEnum } from 'src/common';

export class ResDetail implements Partial<IArticle> {}

export class ResList implements Partial<IArticle> {
  article_id: number;
  title: string;
  thumbnail: string;
  status_publish?: StatusPublishEnum;
  created_at: Date;
  created_by: string;
}
