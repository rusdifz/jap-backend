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

import { AuthGuard } from '../../../middlewares/guards/auth.guard';

import { BodyParam, IJwtUser, UserAuth } from 'src/common';
import { GetListFeedbackDTO } from './dto/request.dto';
import { ReqCreateFeedbackDTO, ReqUpdateFeedbackDTO } from './dto/request.dto';

import { DashboardFeedbackService } from './feedback.service';

@UseGuards(AuthGuard)
@Controller('dashboard/feedback')
export class DashboardFeedbackController {
  constructor(private readonly service: DashboardFeedbackService) {}

  @Version('1')
  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return await this.service.getOne(Number(id));
  }

  @Version('1')
  @Get('')
  async getList(@Query() query: GetListFeedbackDTO) {
    return await this.service.getList(query);
  }

  @Version('1')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('')
  async create(
    @UserAuth() user: IJwtUser, // use this to get user data from header
    @Body() body: ReqCreateFeedbackDTO,
  ) {
    return await this.service.create(body, user);
  }

  @Version('1')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Put(':id')
  async update(
    @UserAuth() user: IJwtUser, // use this to get user data from header
    @BodyParam() bodyparam: ReqUpdateFeedbackDTO,
  ) {
    return await this.service.update(bodyparam, user);
  }

  @Version('1')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async deleteOne(
    @UserAuth() user: IJwtUser, // use this to get user data from header
    @Param('id') id: string,
  ) {
    return await this.service.delete(Number(id), user);
  }
}
