import { IJwtUser } from 'src/common';
import { GetListFeedbackDTO } from './dto/request.dto';
import { ResFeedback } from './dto/response.dto';
import { ReqCreateFeedbackDTO, ReqUpdateFeedbackDTO } from './dto/request.dto';
import { DashboardFeedbackRepository } from './feedback.repository';
export declare class DashboardFeedbackService {
    private readonly repository;
    constructor(repository: DashboardFeedbackRepository);
    getOne(feedback_id: number): Promise<ResFeedback>;
    getList(props: GetListFeedbackDTO): Promise<{
        data: ResFeedback[];
        count: number;
    }>;
    create(body: ReqCreateFeedbackDTO, admin: IJwtUser): Promise<ReqCreateFeedbackDTO>;
    update(body: ReqUpdateFeedbackDTO, admin: IJwtUser): Promise<ReqUpdateFeedbackDTO>;
    delete(feedback_id: number, admin: IJwtUser): Promise<Object>;
    updateImage(feedback_id: number, profile_image: string): Promise<import("typeorm").UpdateResult>;
}
