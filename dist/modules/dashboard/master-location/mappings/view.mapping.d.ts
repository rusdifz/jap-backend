import { MasterLocationDB } from 'src/common/';
import { ResMasterLocation } from '../dto/response.dto';
export declare function mapDbToResDetail(db: MasterLocationDB): Promise<ResMasterLocation>;
export declare function mapDbToResList(dbs: MasterLocationDB[]): Promise<ResMasterLocation[]>;
