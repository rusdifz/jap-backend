import { Controller, Get, Version } from '@nestjs/common';

import { ChartsService } from './charts.service';

@Controller('dashboard/charts')
export class ChartsController {
  constructor(private readonly service: ChartsService) {}

  @Version('1')
  @Get('/has-been-updated-one-month')
  async getChartHasBeenUpdatedOneMonth() {
    return await this.service.chartPropertyHasBeenUpdatedOneMonth();
  }

  @Version('1')
  @Get('/pie-chart')
  async getPieChart() {
    return await this.service.pieChart();
  }

  @Version('1')
  @Get('/statistic')
  async getChartStatistic() {
    return await this.service.chartStatisticProperty();
  }

  @Version('1')
  @Get('/table')
  async getTabelLastUpdated() {
    return await this.service.tabelProperty();
  }
}
