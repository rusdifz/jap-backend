import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { MurLockService } from 'murlock';

import { IJwtUser } from 'src/common';

import { AuthDTO, ReqCreateUserDTO } from './dto/request.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  async login(payload: AuthDTO): Promise<JsonWebKey> {
    let queryWhere = payload.email
      ? { email: payload.email }
      : { username: payload.username };

    const user = await this.repository.findOneBy(queryWhere);

    if (user) {
      const isMatchPassword = await bcrypt.compare(
        payload.password,
        user.password,
      );

      if (isMatchPassword) {
        delete user.password;
        const token = jwt.sign({ user }, process.env.JWT_KEY);
        return token;
      }
    }

    throw new HttpException(
      'Incorrect username or password',
      HttpStatus.BAD_REQUEST,
    );
  }

  //function for create user

  async signup(payload: ReqCreateUserDTO, admin: IJwtUser) {
    payload.password = await bcrypt.hash(payload.password, 10);

    payload['created_by'] = admin?.user?.username ?? 'system';

    //save db
    await this.repository.save(payload);

    delete payload.password;

    return payload;
  }

  async changePassword(payload: AuthDTO) {
    payload.password = await bcrypt.hash(payload.password, 10);

    await this.repository.update(
      { username: payload.username },
      { password: payload.password },
    );

    const user = await this.repository.findOneBy({
      username: payload.username,
    });

    delete user.password;
    const token = jwt.sign({ user }, process.env.JWT_KEY);

    return token;
  }
}
