"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const config_2 = require("./config");
const db_module_1 = require("./config/db/db.module");
const article_module_1 = require("./modules/client/article/article.module");
const feedback_module_1 = require("./modules/client/feedback/feedback.module");
const properties_module_1 = require("./modules/client/properties/properties.module");
const popular_location_module_1 = require("./modules/client/popular-location/popular-location.module");
const admin_module_1 = require("./modules/dashboard/admin/admin.module");
const article_module_2 = require("./modules/dashboard/article/article.module");
const auth_module_1 = require("./modules/dashboard/auth/auth.module");
const charts_module_1 = require("./modules/dashboard/charts/charts.module");
const master_location_module_1 = require("./modules/dashboard/master-location/master-location.module");
const properties_module_2 = require("./modules/dashboard/properties/properties.module");
const units_module_1 = require("./modules/dashboard/units/units.module");
const feedback_module_2 = require("./modules/dashboard/feedback/feedback.module");
const images_module_1 = require("./modules/dashboard/images/images.module");
const common_2 = require("./common");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(config_2.configIndex),
            db_module_1.DbModule,
            article_module_1.ClientArticleModule,
            feedback_module_1.ClientFeedbackModule,
            properties_module_1.ClientPropertiesModule,
            popular_location_module_1.PopularLocationModule,
            admin_module_1.AdminModule,
            article_module_2.DashboardArticleModule,
            auth_module_1.AuthModule,
            charts_module_1.ChartsModule,
            master_location_module_1.DashboardMasterLocationModule,
            properties_module_2.DashboardPropertiesModule,
            units_module_1.DashboardUnitsModule,
            feedback_module_2.DashboardFeedbackModule,
            images_module_1.DashboardImagesModule,
        ],
        providers: [common_2.IsUniqueConstraint],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map