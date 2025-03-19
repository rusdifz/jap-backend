import { Controller, Get, Param, Query, Version } from '@nestjs/common';

import { PropertiesDTO } from './dto/request.dto';
import { ClientPropertiesService } from './properties.service';

@Controller('client/properties')
export class ClientPropertiesController {
  constructor(private readonly service: ClientPropertiesService) {}

  @Version('1')
  @Get(':slug')
  async getDetail(@Param('slug') slug: string) {
    return await this.service.getDetail(slug);
  }

  @Version('1')
  @Get('')
  async getList(@Query() query: PropertiesDTO) {
    return await this.service.getList(query);
  }
}
