import { Controller, Get, Param, Query, Version } from '@nestjs/common';

import { ArticleListDTO } from './dto/response.dto';

import { ClientArticleService } from './article.service';

@Controller('client/article')
// @UseGuards(AuthAdminGuard)
export class ClientArticleController {
  constructor(private readonly service: ClientArticleService) {}

  // @Version('1')
  // @Get(':id')
  // async getDetail(@Param('id') id: string) {
  //   return await this.service.getDetail(Number(id));
  // }
  @Version('1')
  @Get(':slug')
  async getDetail(@Param('slug') slug: string) {
    return await this.service.getDetail(slug);
  }

  @Version('1')
  @Get('')
  async getList(@Query() query: ArticleListDTO) {
    return await this.service.getList(query);
  }
}
