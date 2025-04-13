import { IFeedback, StatusPublishEnum } from 'src/common';
export declare class ResFeedback implements Partial<IFeedback> {
    feedback_id: number;
    profile_image: string;
    profile_name: string;
    comment: string;
    status_publish?: StatusPublishEnum;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;
}
