import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';

import { BodyParam, IJwtUser, UserAuth } from 'src/common';
import { AuthGuard } from '../../../middlewares/guards/auth.guard';
import { UsersDTO } from './dto/request.dto';

import { AdminService } from './admin.service';
import { ReqUpdateUserDTO } from './dto/request.dto';

@Controller('admin')
@UseGuards(AuthGuard)
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Version('1')
  @Get(':username')
  async getDetail(@Param('username') username: string) {
    return await this.service.getOne(username);
  }

  @Version('1')
  @Get('user/profile')
  async getProfile(@UserAuth() user: IJwtUser) {
    return await this.service.getOne(user.user.username);
  }

  @Version('1')
  @Get('')
  async getList(@Query() query: UsersDTO) {
    return await this.service.getList(query);
  }

  @Version('1')
  // @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':username')
  async deleteOne(@Param('username') username: string) {
    return await this.service.delete(username);
  }

  //update user
  // @ApiOperation({ summary: 'endpoint Update user' })
  // @ApiHeader(AuthorizationHeader(true))
  // @ApiOkResponse(swgSignupOK)
  // @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Version('1')
  @Put('update')
  async update(
    @UserAuth() user: IJwtUser,
    @BodyParam() body: ReqUpdateUserDTO,
  ) {
    return await this.service.update(body, user);
  }
}
