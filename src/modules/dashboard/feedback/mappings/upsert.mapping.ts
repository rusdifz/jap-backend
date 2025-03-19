import { ReqCreateFeedbackDTO, ReqUpdateFeedbackDTO } from '../dto/request.dto';
import { FeedbackDB, IJwtUser } from 'src/common';

export async function mapReqCreateToDB(
  body: ReqCreateFeedbackDTO,
  admin: IJwtUser,
): Promise<Partial<FeedbackDB>> {
  return {
    profile_image: body.profile_image,
    profile_name: body.profile_name,
    comment: body.comment,
    created_by: admin?.user?.username ?? 'admin system',
  };
}

export async function mapReqUpdateToDB(
  body: ReqUpdateFeedbackDTO,
  admin: IJwtUser,
): Promise<Partial<FeedbackDB>> {
  return {
    feedback_id: body.feedback_id,
    profile_image: body.profile_image,
    profile_name: body.profile_name,
    comment: body.comment,
    updated_by: admin?.user?.username ?? 'admin system',
  };
}
