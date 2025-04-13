import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedbackDB } from 'src/common';
import { DashboardFeedbackService } from './feedback.service';
import { DashboardFeedbackController } from './feedback.controller';
import { DashboardFeedbackRepository } from './feedback.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackDB])],
  providers: [DashboardFeedbackService, DashboardFeedbackRepository],
  controllers: [DashboardFeedbackController],
  exports: [DashboardFeedbackService],
})
export class DashboardFeedbackModule {}
