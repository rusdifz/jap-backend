import { MasterLocationDB } from 'src/common/';
import { ResLocation } from '../dto/response.dto';

export async function mapDbToResList(
  dbs: MasterLocationDB[],
): Promise<ResLocation[]> {
  const resp: ResLocation[] = dbs.map((db) => {
    return {
      id: db.id,
      location_name: db.location_name,
      position: db.position,
      url_image: db.url_image,
      activate_home: db.activate_home,
    };
  });

  return resp;
}
