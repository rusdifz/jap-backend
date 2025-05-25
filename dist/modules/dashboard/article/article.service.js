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
exports.DashboardArticleService = void 0;
const common_1 = require("@nestjs/common");
const view_mapping_1 = require("./mappings/view.mapping");
const upsert_mapping_1 = require("./mappings/upsert.mapping");
const article_repository_1 = require("./article.repository");
const typeorm_1 = require("typeorm");
let DashboardArticleService = class DashboardArticleService {
    constructor(repository) {
        this.repository = repository;
    }
    async getDetail(article_id) {
        const searchData = await this.repository.findOneBy({ article_id });
        return searchData ? await (0, view_mapping_1.mapDbToResDetail)(searchData, []) : null;
    }
    async getList(props) {
        let query = {
            where: {},
        };
        query = await this.repository.sort(query, props);
        query = await this.repository.paginate(query, props);
        if (props.search_keyword) {
            Object.assign(query.where, { title: (0, typeorm_1.Like)(`%${props.search_keyword}%`) });
        }
        if (props.status_publish) {
            Object.assign(query.where, { status_publish: props.status_publish });
        }
        const searchData = await this.repository.findAndCount(query);
        const mapRes = searchData[0].length > 0 ? await (0, view_mapping_1.mapDbToResList)(searchData[0]) : [];
        return {
            data: mapRes,
            count: searchData[1],
        };
    }
    async create(body, user) {
        const mapSave = await (0, upsert_mapping_1.mapReqCreateToDB)(body, user?.user.username);
        const saveData = await this.repository.save(mapSave);
        body['article_id'] = Number(saveData.article_id);
        return body;
    }
    async update(body, user) {
        const mapUpdate = await (0, upsert_mapping_1.mapReqUpdateToDB)(body, user?.user.username);
        await this.repository.update({ article_id: mapUpdate.article_id }, mapUpdate);
        return body;
    }
    async delete(article_id, admin) {
        const [remove, updateLog] = await Promise.all([
            this.repository.softDelete({ article_id }),
            await this.repository.update({ article_id }, { updated_by: admin?.user?.username ?? 'system' }),
        ]);
        return remove.affected > 0 ? {} : null;
    }
    async updateImage(article_id, thumbnail) {
        return await this.repository.update({ article_id }, { thumbnail });
    }
};
exports.DashboardArticleService = DashboardArticleService;
exports.DashboardArticleService = DashboardArticleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [article_repository_1.DashboardArticleRepository])
], DashboardArticleService);
//# sourceMappingURL=article.service.js.map