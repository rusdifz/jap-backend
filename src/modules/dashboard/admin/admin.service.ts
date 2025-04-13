import { Injectable } from '@nestjs/common';

// import { ReqGetUserListDTO } from 'apps/master/src/modules/user/dto/request.dto';
// import { MasterUserService } from 'apps/master/src/modules/user/user.service';

import { ResUserDTO } from './dto/response.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UsersDTO } from './dto/request.dto';
import { IJwtUser, UsersDB } from 'src/common';
import { ReqUpdateUserDTO } from './dto/request.dto';
import { mapReqUpdateToDB } from './mappings/upsert.mapping';
import { AdminRepository } from './admin.repository';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(private repository: AdminRepository) {}

  async getOne(username: string): Promise<ResUserDTO> {
    const user = await this.repository.findOne({ where: { username } });

    return user ? plainToInstance(ResUserDTO, user, {}) : null;
  }

  async getList(
    props: UsersDTO,
  ): Promise<{ data: ResUserDTO[]; count: number }> {
    // initiate empty where query
    let query: FindManyOptions<UsersDB> = {
      where: {},
    };

    // sort & order query
    query = await this.repository.sort(query, props);

    // pagination query
    query = await this.repository.paginate(query, props);

    if (props.role) {
      Object.assign(query.where, { role: props.role });
    }

    const search = await this.repository.findAndCount(query);

    let users = [];

    if (search[0].length > 0) {
      users = search[0].map((user) => {
        return plainToClass(ResUserDTO, user, {
          excludeExtraneousValues: false,
        });
      });
    }

    return {
      data: users,
      count: search[1],
    };
  }

  async update(
    payload: ReqUpdateUserDTO,
    admin: IJwtUser,
  ): Promise<ReqUpdateUserDTO> {
    const user = await mapReqUpdateToDB(payload, admin);

    await this.repository.update({ id: user.id }, { ...user });

    return payload;
  }

  async delete(username: string): Promise<Object> {
    const [remove, updateLog] = await Promise.all([
      this.repository.softDelete({ username }),
      this.repository.update({ username }, { deleted_by: 'system' }),
    ]);

    return remove.affected > 0 ? {} : null;
  }

  async updateImage(id: number, profile_picture: string) {
    return await this.repository.update({ id }, { profile_picture });
  }
}
