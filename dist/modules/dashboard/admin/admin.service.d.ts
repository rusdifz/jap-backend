import { ResUserDTO } from './dto/response.dto';
import { UsersDTO } from './dto/request.dto';
import { IJwtUser } from 'src/common';
import { ReqUpdateUserDTO } from './dto/request.dto';
import { AdminRepository } from './admin.repository';
export declare class AdminService {
    private repository;
    constructor(repository: AdminRepository);
    getOne(username: string): Promise<ResUserDTO>;
    getList(props: UsersDTO): Promise<{
        data: ResUserDTO[];
        count: number;
    }>;
    update(payload: ReqUpdateUserDTO, admin: IJwtUser): Promise<ReqUpdateUserDTO>;
    delete(username: string): Promise<Object>;
    updateImage(id: number, profile_picture: string): Promise<import("typeorm").UpdateResult>;
}
