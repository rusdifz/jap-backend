import { ReqCreateFeedbackDTO, ReqUpdateFeedbackDTO } from '../dto/request.dto';
import { FeedbackDB, IJwtUser } from 'src/common';
export declare function mapReqCreateToDB(body: ReqCreateFeedbackDTO, admin: IJwtUser): Promise<Partial<FeedbackDB>>;
export declare function mapReqUpdateToDB(body: ReqUpdateFeedbackDTO, admin: IJwtUser): Promise<Partial<FeedbackDB>>;
