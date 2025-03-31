"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardFeedbackModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_2 = require("../../../common");
const feedback_service_1 = require("./feedback.service");
const feedback_controller_1 = require("./feedback.controller");
const feedback_repository_1 = require("./feedback.repository");
let DashboardFeedbackModule = class DashboardFeedbackModule {
};
exports.DashboardFeedbackModule = DashboardFeedbackModule;
exports.DashboardFeedbackModule = DashboardFeedbackModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([common_2.FeedbackDB])],
        providers: [feedback_service_1.DashboardFeedbackService, feedback_repository_1.DashboardFeedbackRepository],
        controllers: [feedback_controller_1.DashboardFeedbackController],
    })
], DashboardFeedbackModule);
//# sourceMappingURL=feedback.module.js.map