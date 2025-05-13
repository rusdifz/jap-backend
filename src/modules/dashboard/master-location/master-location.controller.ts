import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Version,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';

import {
  AuthorizationHeader,
  BodyParam,
  IJwtUser,
  PaginationDTO,
  UserAuth,
} from 'src/common';

import { DashboardMasterLocationService } from './master-location.service';
import {
  ReqCreateMasterLocationDTO,
  ReqUpdateMasterLocationDTO,
} from './dto/request.dto';
import { AuthGuard } from 'src/middlewares/guards/auth.guard';

@Controller('dashboard/master-location')
@UseGuards(AuthGuard)
export class DashboardMasterLocationController {
  constructor(private readonly service: DashboardMasterLocationService) {}

  @ApiOperation({
    summary: 'endpoint create master location',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  //   @ApiCreatedResponse(swgCreateOK)
  @Version('1')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('')
  async create(
    @UserAuth() user: IJwtUser, // use this to get user data from header
    @Body() body: ReqCreateMasterLocationDTO,
  ) {
    console.log('user', user);

    return await this.service.create(body, user);
  }

  @ApiOperation({
    summary: 'endpoint update master location',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  //   @ApiCreatedResponse(swgCreateOK)
  @Version('1')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Put(':id')
  async update(
    @UserAuth() user: IJwtUser, // use this to get user data from header
    @BodyParam() bodyparam: ReqUpdateMasterLocationDTO,
  ) {
    return await this.service.update(bodyparam, user);
  }

  @ApiOperation({
    summary: 'endpoint delete master location',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  //   @ApiOkResponse(swgDeleteOK)
  @Version('1')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async deleteOne(@Param('id') id: number, @UserAuth() user: IJwtUser) {
    return await this.service.delete(id, user);
  }

  @ApiOperation({
    summary: 'endpoint get Master Location',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  // @ApiOkResponse(swgGetDetailOK)
  @Version('1')
  @Get(':id')
  async getDetail(@Param('id') id: number) {
    return await this.service.getDetail(id);
  }

  @ApiOperation({
    summary: 'endpoint get office list',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  //   @ApiOkResponse(swgGetListOK)
  @Version('1')
  @Get('')
  async getList(@Query() query: PaginationDTO) {
    return await this.service.getList(query);
  }
}
