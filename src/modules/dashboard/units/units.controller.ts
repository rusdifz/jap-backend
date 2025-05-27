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
import { Throttle } from '@nestjs/throttler';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '../../../middlewares/guards/auth.guard';

import {
  swgCreateOK,
  swgUpdateOK,
  swgGetDetailOK,
  swgGetListOK,
} from './swaggers/endpoint.swagger';

import {
  AuthorizationHeader,
  BodyParam,
  CommonHeaders,
  IJwtUser,
  swgDeleteOK,
  UserAuth,
} from 'src/common';

import { DashboardUnitsService } from './units.service';
import {
  ReqCreateUnitDTO,
  ReqUpdateUnitDTO,
  UnitListDTO,
} from './dto/request.dto';

@UseGuards(AuthGuard)
@Controller('dashboard/units')
export class DashboardUnitsController {
  constructor(private readonly service: DashboardUnitsService) {}

  @ApiOperation({
    summary: 'endpoint get unit detail',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  // @ApiOkResponse(swgGetDetailOK)
  @Version('1')
  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return await this.service.getDetail(id);
  }

  @ApiOperation({
    summary: 'endpoint get unit list',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  //   @ApiOkResponse(swgGetListOK)
  @Version('1')
  @Get('')
  async getList(@Query() query: UnitListDTO) {
    return await this.service.getList(query);
  }

  @ApiOperation({
    summary: 'endpoint create unit',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  @ApiCreatedResponse(swgCreateOK)
  @Version('1')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('')
  async create(
    @UserAuth() user: IJwtUser, // use this to get user data from header
    @Body() body: ReqCreateUnitDTO,
  ) {
    return await this.service.create(body, user);
  }

  @ApiOperation({
    summary: 'endpoint update unit',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  @ApiCreatedResponse(swgUpdateOK)
  @Version('1')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Put(':unit_id')
  async update(
    @UserAuth() user: IJwtUser, // use this to get user data from header
    @BodyParam() body: ReqUpdateUnitDTO,
  ) {
    console.log('body unit', body);

    return await this.service.update(body, user);
  }

  @ApiOperation({
    summary: 'endpoint delete unit',
    description: '',
  })
  // @ApiHeader(AuthorizationHeader(true))
  // @ApiOkResponse(swgDeleteOK)
  @Version('1')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async deleteOne(
    @UserAuth() user: IJwtUser, // use this to get user data from header
    @Param('id') id: string,
  ) {
    return await this.service.delete(id, user);
  }
}
