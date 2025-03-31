import { PropertiesDB } from 'src/common/';
import { ResProperties, ResProperty } from '../dto/response.dto';
export declare function mapDbToResDetail(db: PropertiesDB): Promise<ResProperty>;
export declare function mapDbToResList(dbs: PropertiesDB[]): Promise<ResProperties[]>;
