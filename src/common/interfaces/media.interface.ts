import { MediaReferenceType, MediaTypeEnum } from '../enums';
import { PropertyAbstract } from './property.interface';

export interface IMedia {
  media_id: string;
  reference_id?: string | number;
  reference_type: MediaReferenceType;
  host: string;
  path: string;
  name: string;
  public_id: string; //public id cloudinary
  type: MediaTypeEnum;
  full_url: string;
  property?: PropertyAbstract;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
