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

import { ArticleListDTO } from './dto/request.dto';

import { ReqCreateArticleDTO, ReqUpdateArticleDTO } from './dto/request.dto';

import { BodyParam, IJwtUser, UserAuth } from 'src/common';

import { DashboardArticleService } from './article.service';
import { AuthGuard } from 'src/middlewares/guards/auth.guard';

@Controller('dashboard/article')
@UseGuards(AuthGuard)
export class DashboardArticleController {
  constructor(private readonly service: DashboardArticleService) {}

  @Version('1')
  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return await this.service.getDetail(Number(id));
  }

  @Version('1')
  @Get('')
  async getList(@Query() query: ArticleListDTO) {
    return await this.service.getList(query);
  }

  @Version('1')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('')
  async create(
    @UserAuth() user: IJwtUser, // use this to get user data from header
    // user: any,
    @Body() body: ReqCreateArticleDTO,
  ) {
    return await this.service.create(body, user);
  }

  @Version('1')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Put(':id')
  async update(
    @UserAuth() user: IJwtUser, // use this to get user data from header
    @BodyParam() bodyparam: ReqUpdateArticleDTO,
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
