import { IFeedback, PaginationDTO } from 'src/common';
export declare class ReqCreateFeedbackDTO implements Partial<IFeedback> {
    profile_image: string;
    profile_name: string;
    comment: string;
}
export declare class ReqUpdateFeedbackDTO extends ReqCreateFeedbackDTO {
    feedback_id: number;
}
export declare class GetListFeedbackDTO extends PaginationDTO {
}
