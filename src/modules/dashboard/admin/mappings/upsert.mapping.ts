import { UsersDB } from 'src/common/entities';
import { ReqUpdateUserDTO } from '../dto/request.dto';
import { IJwtUser } from 'src/common/interfaces';

export async function mapReqUpdateToDB(
  body: ReqUpdateUserDTO,
  admin: IJwtUser,
): Promise<Partial<UsersDB>> {
  return {
    id: body.id,
    email: body.email,
    phone_number: body.phone_number,
    first_name: body.first_name,
    last_name: body.last_name,
    profile_picture: body.profile_picture,
    role: body.role,
    address: body.address,
    // join_date: body.join_date,
    updated_by: admin.user.username,
  };
}
