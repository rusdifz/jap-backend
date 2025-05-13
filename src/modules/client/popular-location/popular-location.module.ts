import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MasterLocationDB } from 'src/common';

import { PopularLocationService } from './popular-location.service';
import { PopularLocationsRepository } from './popular-location.repository';
import { PopularLocationController } from './popular-location.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MasterLocationDB])],
  providers: [PopularLocationsRepository, PopularLocationService],
  controllers: [PopularLocationController],
})
export class PopularLocationModule {}
