import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticleDB } from 'src/common';

import { DashboardImagesModule } from 'src/modules/dashboard/images/images.module';

import { ClientArticleRepository } from './article.repository';
import { ClientArticleService } from './article.service';
import { ClientArticleController } from './article.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleDB]), DashboardImagesModule],
  providers: [ClientArticleRepository, ClientArticleService],
  controllers: [ClientArticleController],
})
export class ClientArticleModule {}
