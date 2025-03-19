import { PropertyAbstract } from './property.interface';

export interface IMedia {
  media_id: string;
  property_id: number;
  host: string;
  path: string;
  property?: PropertyAbstract;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
