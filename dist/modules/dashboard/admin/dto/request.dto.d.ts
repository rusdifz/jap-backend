import { RoleEnum } from 'src/common/enums';
import { IUser } from 'src/common/interfaces';
import { PaginationDTO } from 'src/common';
export declare class ReqUpdateUserDTO implements Partial<IUser> {
    id: number;
    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    role: RoleEnum;
    address?: string;
    join_date: string;
}
export declare class UsersDTO extends PaginationDTO {
    username?: string;
    role?: RoleEnum;
}
export declare class UserDetailDTO {
    username?: string;
    email?: string;
}
