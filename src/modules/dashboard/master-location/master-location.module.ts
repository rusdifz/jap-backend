import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MasterLocationDB } from 'src/common';

import { DashboardMasterLocationService } from './master-location.service';
import { DashboardMasterLocationController } from './master-location.controller';
import { DashboardMasterLocationsRepository } from './master-location.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MasterLocationDB])],
  providers: [
    DashboardMasterLocationsRepository,
    DashboardMasterLocationService,
  ],
  controllers: [DashboardMasterLocationController],
  exports: [DashboardMasterLocationService],
})
export class DashboardMasterLocationModule {}
