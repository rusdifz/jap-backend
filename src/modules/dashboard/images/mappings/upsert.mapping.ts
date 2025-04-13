// import { ArticleDB } from 'src/common/entities';
// import { ReqCreateArticleDTO, ReqUpdateArticleDTO } from '../dto/request.dto';

import { MediaDB, MediaReferenceType, MediaTypeEnum } from 'src/common';

export async function mapInsertDB(
  file: Express.Multer.File,
  reference_id: number,
  reference_type: MediaReferenceType,
): Promise<Partial<MediaDB>> {
  const host = process.env.URL_MEDIA;
  return {
    reference_id: Number(reference_id),
    reference_type,
    host: host,
    path: file.destination,
    name: file.filename,
    type: file.mimetype.includes('image')
      ? MediaTypeEnum.IMAGE
      : MediaTypeEnum.VIDEO,
    mimetype: file.mimetype,
    full_url: `${host}/api/media/image/${file.filename}`,
  };
}

// export async function mapReqUpdateToDB(
//   payload: ReqUpdateArticleDTO,
//   username_login: string,
// ): Promise<Partial<ArticleDB>> {
//   return {
//     article_id: payload.article_id,
//     title: payload.title,
//     slug: payload['slug'],
//     content: payload.content,
//     thumbnail: payload.thumbnail,
//     status_publish: payload.status_publish,
//     updated_by: username_login ?? 'admin system',
//   };
// }
