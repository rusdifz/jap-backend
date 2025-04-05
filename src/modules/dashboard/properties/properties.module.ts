import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardPropertiesRepository } from './properties.repository';
import { DashboardPropertiesService } from './services/properties.service';
import { DashboardPropertiesGenerateFileService } from './services/properties-generate-file.service';
import { DashboardPropertiesController } from './properties.controller';

import { DashboardUnitsModule } from '../units/units.module';
import { PropertiesDB } from 'src/common';

@Module({
  imports: [TypeOrmModule.forFeature([PropertiesDB]), DashboardUnitsModule],
  providers: [
    DashboardPropertiesRepository,
    DashboardPropertiesService,
    DashboardPropertiesGenerateFileService,
  ],
  controllers: [DashboardPropertiesController],
  exports: [DashboardPropertiesService],
})
export class DashboardPropertiesModule {}
