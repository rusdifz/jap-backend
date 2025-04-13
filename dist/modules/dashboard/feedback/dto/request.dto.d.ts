import { IFeedback, PaginationDTO, StatusPublishEnum } from 'src/common';
export declare class ReqCreateFeedbackDTO implements Partial<IFeedback> {
    profile_image: string;
    profile_name: string;
    comment: string;
    status_publish: StatusPublishEnum;
}
declare const ReqUpdateFeedbackDTO_base: import("@nestjs/common").Type<Partial<ReqCreateFeedbackDTO>>;
export declare class ReqUpdateFeedbackDTO extends ReqUpdateFeedbackDTO_base {
    feedback_id: number;
}
export declare class GetListFeedbackDTO extends PaginationDTO {
    status_publish: StatusPublishEnum;
}
export {};
