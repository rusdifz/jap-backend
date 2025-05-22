import { IJwtUser } from 'src/common';
import { GetListFeedbackDTO } from './dto/request.dto';
import { ReqCreateFeedbackDTO, ReqUpdateFeedbackDTO } from './dto/request.dto';
import { DashboardFeedbackService } from './feedback.service';
export declare class DashboardFeedbackController {
    private readonly service;
    constructor(service: DashboardFeedbackService);
    getDetail(id: string): Promise<import("./dto/response.dto").ResFeedback>;
    getList(query: GetListFeedbackDTO): Promise<{
        data: import("./dto/response.dto").ResFeedback[];
        count: number;
    }>;
    create(user: IJwtUser, body: ReqCreateFeedbackDTO): Promise<ReqCreateFeedbackDTO>;
    update(user: IJwtUser, bodyparam: ReqUpdateFeedbackDTO): Promise<ReqUpdateFeedbackDTO>;
    deleteOne(user: IJwtUser, id: string): Promise<Object>;
}
