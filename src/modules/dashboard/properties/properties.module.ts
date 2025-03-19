import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardPropertiesRepository } from './properties.repository';
import { DashboardPropertiesService } from './properties.service';
import { DashboardPropertiesController } from './properties.controller';

import { DashboardUnitsModule } from '../units/units.module';
import { PropertiesDB } from 'src/common';

@Module({
  imports: [TypeOrmModule.forFeature([PropertiesDB]), DashboardUnitsModule],
  providers: [DashboardPropertiesRepository, DashboardPropertiesService],
  controllers: [DashboardPropertiesController],
  exports: [DashboardPropertiesService],
})
export class DashboardPropertiesModule {}
