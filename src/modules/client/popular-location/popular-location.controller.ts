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
} from '@nestjs/common';
// import { Throttle } from '@nestjs/throttler';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';

import { AuthorizationHeader } from 'src/common';

import { PopularLocationService } from './popular-location.service';

@Controller('client/popular-location')
export class PopularLocationController {
  constructor(private readonly service: PopularLocationService) {}

  @ApiOperation({
    summary: 'endpoint get popular location',
    description: '',
  })
  @ApiHeader(AuthorizationHeader(true))
  //   @ApiOkResponse(swgGetListOK)
  @Version('1')
  @Get('')
  async getList() {
    return await this.service.getList();
  }
}
