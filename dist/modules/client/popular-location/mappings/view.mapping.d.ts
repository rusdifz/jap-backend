import { MasterLocationDB } from 'src/common/';
import { ResLocation } from '../dto/response.dto';
export declare function mapDbToResList(dbs: MasterLocationDB[]): Promise<ResLocation[]>;
