import { UsersDB } from 'src/common/entities';
import { ReqUpdateUserDTO } from '../dto/request.dto';
import { IJwtUser } from 'src/common/interfaces';
export declare function mapReqUpdateToDB(body: ReqUpdateUserDTO, admin: IJwtUser): Promise<Partial<UsersDB>>;
