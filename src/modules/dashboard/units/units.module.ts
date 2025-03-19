import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropertiesDB, UnitsDB } from 'src/common';

import { DashboardUnitsService } from './units.service';
import { DashboardUnitsController } from './units.controller';
import { DashboardUnitsRepository } from './units.repository';

import { DashboardPropertiesModule } from '../properties/properties.module';

@Module({
  // imports: [TypeOrmModule.forFeature([UnitsDB]), DashboardPropertiesModule],
  imports: [TypeOrmModule.forFeature([UnitsDB, PropertiesDB])],
  providers: [DashboardUnitsService, DashboardUnitsRepository],
  controllers: [DashboardUnitsController],
  exports: [DashboardUnitsService],
})
export class DashboardUnitsModule {}
