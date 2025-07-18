import { Controller, Get, Version } from '@nestjs/common';

import { ChartsService } from './charts.service';

@Controller('dashboard/charts')
export class ChartsController {
  constructor(private readonly service: ChartsService) {}

  @Version('1')
  @Get('/home')
  async getHomeDashboard() {
    return await this.service.homeDashboard();
  }
}
