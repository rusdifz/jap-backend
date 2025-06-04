import { MediaDB, PropertiesDB } from 'src/common';
import { ResProperty } from '../dto/response.dto';
export declare function mapDbToResDetail(db: PropertiesDB, images: MediaDB[]): Promise<ResProperty>;
export declare function mapDbToResList(dbs: PropertiesDB[]): Promise<ResProperty[]>;
