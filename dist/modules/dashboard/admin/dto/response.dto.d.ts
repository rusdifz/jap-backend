import { RoleEnum, IUser } from 'src/common';
export declare class ResUserDTO implements Partial<IUser> {
    id: number;
    username: string;
    email: string;
    password: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    role: RoleEnum;
    address?: string;
    created_at: string;
}
export declare class ResUserListDTO implements Partial<IUser> {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
}
