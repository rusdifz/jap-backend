import { RoleEnum } from '../enums';
import { IUser } from '../interfaces/user.interface';
export declare class UsersDB implements IUser {
    id: number;
    username: string;
    email: string;
    phone_number: string;
    password: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    address: string;
    role: RoleEnum;
    join_date: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    created_by: string;
    updated_by: string;
    deleted_by: string;
}
