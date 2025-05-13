import { UploadApiResponse } from 'cloudinary';
import { MediaDB, MediaReferenceType, MediaTypeEnum } from 'src/common';

export async function mapInsertDB(
  file: Express.Multer.File,
  reference_id: number,
  reference_type: MediaReferenceType,
  resp_cloudinary: UploadApiResponse | any,
): Promise<Partial<MediaDB>> {
  const host = process.env.URL_MEDIA;

  const url = new URL(resp_cloudinary.secure_url);
  const pathParts = url.pathname.split('/');
  const fileName = pathParts[pathParts.length - 1];

  return {
    reference_id: Number(reference_id),
    reference_type,
    host: host,
    path: resp_cloudinary.folder,
    public_id: resp_cloudinary.public_id,
    type: file.mimetype.includes('image')
      ? MediaTypeEnum.IMAGE
      : MediaTypeEnum.VIDEO,
    mimetype: file.mimetype,
    full_url: resp_cloudinary.secure_url,
    name: fileName,
  };
}
