import { IJwtUser } from 'src/common';
import { AuthDTO, ReqCreateUserDTO } from './dto/request.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    login(body: AuthDTO): Promise<JsonWebKey>;
    create(user: IJwtUser, body: ReqCreateUserDTO): Promise<ReqCreateUserDTO>;
    createSignupAllData(user: IJwtUser, body: ReqCreateUserDTO): Promise<ReqCreateUserDTO>;
    changePassword(body: AuthDTO): Promise<any>;
}
