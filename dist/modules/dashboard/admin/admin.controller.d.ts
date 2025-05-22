import { IJwtUser } from 'src/common';
import { UsersDTO } from './dto/request.dto';
import { AdminService } from './admin.service';
import { ReqUpdateUserDTO } from './dto/request.dto';
export declare class AdminController {
    private readonly service;
    constructor(service: AdminService);
    getDetail(username: string): Promise<import("./dto/response.dto").ResUserDTO>;
    getProfile(user: IJwtUser): Promise<import("./dto/response.dto").ResUserDTO>;
    getList(query: UsersDTO): Promise<{
        data: import("./dto/response.dto").ResUserDTO[];
        count: number;
    }>;
    deleteOne(username: string): Promise<Object>;
    update(user: IJwtUser, body: ReqUpdateUserDTO): Promise<ReqUpdateUserDTO>;
}
