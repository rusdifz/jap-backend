import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedbackDB } from 'src/common';

import { ClientFeedbackService } from './feedback.service';
import { ClientFeedbackController } from './feedback.controller';
import { ClientFeedbackRepository } from './feedback.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackDB])],
  providers: [ClientFeedbackService, ClientFeedbackRepository],
  controllers: [ClientFeedbackController],
})
export class ClientFeedbackModule {}
