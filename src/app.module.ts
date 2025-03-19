import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configIndex } from 'src/config';
import { DbModule } from 'src/config/db/db.module';

import { ClientArticleModule } from './modules/client/article/article.module';
import { ClientFeedbackModule } from './modules/client/feedback/feedback.module';
import { ClientPropertiesModule } from './modules/client/properties/properties.module';
import { AdminModule } from './modules/dashboard/admin/admin.module';
import { DashboardArticleModule } from './modules/dashboard/article/article.module';
import { AuthModule } from './modules/dashboard/auth/auth.module';
import { DashboardPropertiesModule } from './modules/dashboard/properties/properties.module';
import { DashboardUnitsModule } from './modules/dashboard/units/units.module';
import { DashboardFeedbackModule } from './modules/dashboard/feedback/feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot(configIndex),
    DbModule,
    ClientArticleModule,
    ClientFeedbackModule,
    ClientPropertiesModule,
    AdminModule,
    DashboardArticleModule,
    AuthModule,
    DashboardPropertiesModule,
    DashboardUnitsModule,
    DashboardFeedbackModule,
  ],
})
export class AppModule {}
