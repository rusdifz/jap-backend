import { IJwtUser } from 'src/common';
import { AuthDTO, ReqCreateUserDTO } from './dto/request.dto';
import { AuthRepository } from './auth.repository';
export declare class AuthService {
    private readonly repository;
    constructor(repository: AuthRepository);
    login(payload: AuthDTO): Promise<JsonWebKey>;
    signup(payload: ReqCreateUserDTO, admin: IJwtUser): Promise<ReqCreateUserDTO>;
    changePassword(payload: AuthDTO): Promise<any>;
}
