import { Module } from '@nestjs/common';

import { DashboardPropertiesModule } from '../properties/properties.module';
import { DashboardMasterLocationModule } from '../master-location/master-location.module';

import { ChartsService } from './charts.service';
import { ChartsController } from './charts.controller';

@Module({
  imports: [DashboardPropertiesModule, DashboardMasterLocationModule],
  providers: [ChartsService],
  controllers: [ChartsController],
})
export class ChartsModule {}
