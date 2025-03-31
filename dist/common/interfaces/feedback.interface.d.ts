export interface IFeedback {
    feedback_id: number;
    profile_image: string;
    profile_name: string;
    comment: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    created_by: string;
    updated_by: string;
    deleted_by: string;
}
