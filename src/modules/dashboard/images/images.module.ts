import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaDB } from 'src/common';

import { DashboardImageRepository } from './images.repository';
import { DashboardImagesService } from './images.service';
import { DashboardImagesController } from './images.controller';
import { DashboardFeedbackModule } from '../feedback/feedback.module';
import { DashboardArticleModule } from '../article/article.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaDB]),
    DashboardFeedbackModule,
    DashboardArticleModule,
    AdminModule,
  ],
  providers: [DashboardImageRepository, DashboardImagesService],
  controllers: [DashboardImagesController],
  exports: [DashboardImagesService],
})
export class DashboardImagesModule {}
