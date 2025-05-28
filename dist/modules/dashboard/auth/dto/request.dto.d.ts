import { RoleEnum } from 'src/common';
export declare class AuthDTO {
    username: string;
    email: string;
    password: string;
}
export declare class ReqCreateUserDTO {
    username: string;
    email: string;
    password: string;
    role: RoleEnum;
}
