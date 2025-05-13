import { IMasterLocation } from 'src/common/interfaces/master-location';

export class ResMasterLocation implements Partial<IMasterLocation> {
  id: number;
  location_name: string;
  position: number;
  activate_home: boolean;
  url_image?: string;
  created_at: Date;
  updated_at: Date;
}
