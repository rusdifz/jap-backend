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
exports.ClientArticleService = void 0;
const common_1 = require("@nestjs/common");
const view_mapping_1 = require("./mappings/view.mapping");
const article_repository_1 = require("./article.repository");
const common_2 = require("../../../common");
let ClientArticleService = class ClientArticleService {
    constructor(repository) {
        this.repository = repository;
    }
    async getDetail(article_id) {
        const searchData = await this.repository.findOneBy({
            article_id,
            status_publish: common_2.StatusPublishEnum.PUBLISH,
        });
        return searchData ? await (0, view_mapping_1.mapDbToResDetail)(searchData) : null;
    }
    async getList(props) {
        let query = {
            where: {
                status_publish: common_2.StatusPublishEnum.PUBLISH,
            },
        };
        query = await this.repository.sort(query, props);
        query = await this.repository.paginate(query, props);
        const searchData = await this.repository.findAndCount(query);
        const mapRes = searchData[0].length > 0 ? await (0, view_mapping_1.mapDbToResList)(searchData[0]) : [];
        return {
            data: mapRes,
            count: searchData[1],
        };
    }
};
exports.ClientArticleService = ClientArticleService;
exports.ClientArticleService = ClientArticleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [article_repository_1.ClientArticleRepository])
], ClientArticleService);
//# sourceMappingURL=article.service.js.map