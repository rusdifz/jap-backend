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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const response_dto_1 = require("./dto/response.dto");
const class_transformer_1 = require("class-transformer");
const upsert_mapping_1 = require("./mappings/upsert.mapping");
const admin_repository_1 = require("./admin.repository");
let AdminService = class AdminService {
    constructor(repository) {
        this.repository = repository;
    }
    async getOne(username) {
        const user = await this.repository.findOne({ where: { username } });
        return user ? (0, class_transformer_1.plainToInstance)(response_dto_1.ResUserDTO, user, {}) : null;
    }
    async getList(props) {
        let query = {
            where: {},
        };
        query = await this.repository.sort(query, props);
        query = await this.repository.paginate(query, props);
        const search = await this.repository.findAndCount(query);
        let users = [];
        if (search[0].length > 0) {
            users = search[0].map((user) => {
                return (0, class_transformer_1.plainToClass)(response_dto_1.ResUserDTO, user, {
                    excludeExtraneousValues: false,
                });
            });
        }
        return {
            data: users,
            count: search[1],
        };
    }
    async update(payload, admin) {
        const user = await (0, upsert_mapping_1.mapReqUpdateToDB)(payload, admin);
        await this.repository.update({ id: user.id }, { ...user });
        return payload;
    }
    async delete(username) {
        const [remove, updateLog] = await Promise.all([
            this.repository.softDelete({ username }),
            this.repository.update({ username }, { deleted_by: 'system' }),
        ]);
        return remove.affected > 0 ? {} : null;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository])
], AdminService);
//# sourceMappingURL=admin.service.js.map