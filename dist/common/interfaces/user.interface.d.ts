import { RoleEnum } from '../enums';
export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    role: RoleEnum;
    address: string;
    join_date: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    created_by: string;
    updated_by: string;
    deleted_by: string;
}
