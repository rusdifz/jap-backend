import { Meta } from 'src/common';
import { ReqCreateUserDTO } from '../dto/request.dto';
export declare class SwgSignup {
    meta: Meta;
    data: ReqCreateUserDTO;
}
export declare class SwgLogin {
    meta: Meta;
    data: JsonWebKey;
}
