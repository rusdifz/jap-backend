import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaDB } from 'src/common';

import { DashboardImageRepository } from './images.repository';
import { DashboardImagesService } from './images.service';
import { DashboardImagesController } from './images.controller';
import { DashboardFeedbackModule } from '../feedback/feedback.module';
import { DashboardArticleModule } from '../article/article.module';
import { AdminModule } from '../admin/admin.module';
import { DashboardMasterLocationModule } from '../master-location/master-location.module';
import { CloudinaryFileModule } from 'src/libs/cloudinary-file/cloudinary-file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaDB]),
    DashboardFeedbackModule,
    DashboardArticleModule,
    AdminModule,
    DashboardMasterLocationModule,
    CloudinaryFileModule,
  ],
  providers: [DashboardImageRepository, DashboardImagesService],
  controllers: [DashboardImagesController],
  exports: [DashboardImagesService],
})
export class DashboardImagesModule {}
