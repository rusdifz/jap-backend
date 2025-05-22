import { IJwtUser, UnitsDB } from 'src/common';
import { ReqCreateUnitDTO, ReqUpdateUnitDTO } from '../dto/request.dto';
export declare function mapReqCreateToDB(body: ReqCreateUnitDTO, admin: IJwtUser): Promise<Partial<UnitsDB>>;
export declare function mapReqUpdateToDB(body: ReqUpdateUnitDTO, admin: IJwtUser): Promise<Partial<UnitsDB>>;
