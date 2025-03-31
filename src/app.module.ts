import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configIndex } from 'src/config';
import { DbModule } from 'src/config/db/db.module';

// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

import { ClientArticleModule } from './modules/client/article/article.module';
import { ClientFeedbackModule } from './modules/client/feedback/feedback.module';
import { ClientPropertiesModule } from './modules/client/properties/properties.module';
import { AdminModule } from './modules/dashboard/admin/admin.module';
import { DashboardArticleModule } from './modules/dashboard/article/article.module';
import { AuthModule } from './modules/dashboard/auth/auth.module';
import { DashboardPropertiesModule } from './modules/dashboard/properties/properties.module';
import { DashboardUnitsModule } from './modules/dashboard/units/units.module';
import { DashboardFeedbackModule } from './modules/dashboard/feedback/feedback.module';
import { DashboardImagesModule } from './modules/dashboard/images/images.module';
@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    //   // Anda dapat mengatur opsi tambahan, misalnya:
    //   // serveRoot: '/static',  // akses file dengan URL: http://localhost:3000/static/namafile
    // }),
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
    DashboardImagesModule,
  ],
})
export class AppModule {}
