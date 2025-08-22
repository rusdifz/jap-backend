import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configIndex } from 'src/config';
import { DbModule } from 'src/config/db/db.module';

// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

import { AppController } from './app.controler';

import { ClientArticleModule } from './modules/client/article/article.module';
import { ClientFeedbackModule } from './modules/client/feedback/feedback.module';
import { ClientPropertiesModule } from './modules/client/properties/properties.module';
import { PopularLocationModule } from './modules/client/popular-location/popular-location.module';
import { AdminModule } from './modules/dashboard/admin/admin.module';
import { DashboardArticleModule } from './modules/dashboard/article/article.module';
import { AuthModule } from './modules/dashboard/auth/auth.module';
import { ChartsModule } from './modules/dashboard/charts/charts.module';
import { DashboardMasterLocationModule } from './modules/dashboard/master-location/master-location.module';
import { DashboardPropertiesModule } from './modules/dashboard/properties/properties.module';
import { DashboardUnitsModule } from './modules/dashboard/units/units.module';
import { DashboardFeedbackModule } from './modules/dashboard/feedback/feedback.module';
import { DashboardImagesModule } from './modules/dashboard/images/images.module';
import { IsUniqueConstraint } from './common';

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
    PopularLocationModule,
    AdminModule,
    DashboardArticleModule,
    AuthModule,
    ChartsModule,
    DashboardMasterLocationModule,
    DashboardPropertiesModule,
    DashboardUnitsModule,
    DashboardFeedbackModule,
    DashboardImagesModule,
  ],
  providers: [IsUniqueConstraint],
  controllers: [AppController]
})
export class AppModule {}
