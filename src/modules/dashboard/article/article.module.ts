import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardArticleService } from './article.service';
import { DashboardArticleController } from './article.controller';
import { ArticleDB } from 'src/common';
import { DashboardArticleRepository } from './article.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleDB])],
  providers: [DashboardArticleRepository, DashboardArticleService],
  controllers: [DashboardArticleController],
})
export class DashboardArticleModule {}
