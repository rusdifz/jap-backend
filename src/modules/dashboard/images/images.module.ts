import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaDB } from 'src/common';

import { DashboardImageRepository } from './images.repository';
import { DashboardImagesService } from './images.service';
import { DashboardImagesController } from './images.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MediaDB])],
  providers: [DashboardImageRepository, DashboardImagesService],
  controllers: [DashboardImagesController],
})
export class DashboardImagesModule {}
