import { dayjs, MasterLocationDB } from 'src/common/';
import { ResMasterLocation } from '../dto/response.dto';

export async function mapDbToResDetail(
  db: MasterLocationDB,
): Promise<ResMasterLocation> {
  return {
    id: db.id,
    location_name: db.location_name,
    position: db.position,
    activate_home: db.activate_home,
    url_image: db.url_image,
    created_at: dayjs(db.created_at).format('MMMM D, YYYY'),
    updated_at: dayjs(db.updated_at).format('MMMM D, YYYY'),
  };
}

export async function mapDbToResList(
  dbs: MasterLocationDB[],
): Promise<ResMasterLocation[]> {
  const resp: ResMasterLocation[] = dbs.map((db) => {
    return {
      id: db.id,
      location_name: db.location_name,
      position: db.position,
      activate_home: db.activate_home,
      created_at: dayjs(db.created_at).format('MMMM D, YYYY'),
      updated_at: dayjs(db.updated_at).format('MMMM D, YYYY'),
    };
  });

  return resp;
}
