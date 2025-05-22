import { PropertiesDB, IJwtUser } from 'src/common';
import { ReqCreatePropertyDTO, ReqUpdatePropertyDTO } from '../dto/request.dto';
export declare function mapReqCreateToDb(payload: ReqCreatePropertyDTO, admin: IJwtUser): Promise<Partial<PropertiesDB>>;
export declare function mapReqUpdateToDB(payload: ReqUpdatePropertyDTO, admin: IJwtUser): Promise<Partial<PropertiesDB>>;
