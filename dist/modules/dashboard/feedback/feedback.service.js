"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardFeedbackService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const response_dto_1 = require("./dto/response.dto");
const upsert_mapping_1 = require("./mappings/upsert.mapping");
const feedback_repository_1 = require("./feedback.repository");
let DashboardFeedbackService = class DashboardFeedbackService {
    constructor(repository) {
        this.repository = repository;
    }
    async getOne(feedback_id) {
        const feedback = await this.repository.findOneBy({ feedback_id });
        return feedback ? (0, class_transformer_1.plainToInstance)(response_dto_1.ResFeedback, feedback, {}) : null;
    }
    async getList(props) {
        let query = {
            where: {},
        };
        query = await this.repository.sort(query, props);
        query = await this.repository.paginate(query, props);
        const searchData = await this.repository.findAndCount(query);
        const feedback = searchData[0].length > 0
            ? searchData[0].map((dt) => {
                return (0, class_transformer_1.plainToInstance)(response_dto_1.ResFeedback, dt, {});
            })
            : [];
        return {
            data: feedback,
            count: searchData[1],
        };
    }
    async create(body, admin) {
        const feedback = await (0, upsert_mapping_1.mapReqCreateToDB)(body, admin);
        const saveData = await this.repository.save(feedback);
        body['feedback_id'] = saveData.feedback_id;
        return body;
    }
    async update(body, admin) {
        const feedback = await (0, upsert_mapping_1.mapReqUpdateToDB)(body, admin);
        await this.repository.update({ feedback_id: feedback.feedback_id }, { ...feedback });
        return body;
    }
    async delete(feedback_id, admin) {
        const del = await this.repository.softDelete({ feedback_id });
        if (del.affected > 0) {
            await this.repository.update({ feedback_id }, { deleted_by: admin?.user?.username ?? 'system' });
        }
        return del;
    }
};
exports.DashboardFeedbackService = DashboardFeedbackService;
exports.DashboardFeedbackService = DashboardFeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [feedback_repository_1.DashboardFeedbackRepository])
], DashboardFeedbackService);
//# sourceMappingURL=feedback.service.js.map