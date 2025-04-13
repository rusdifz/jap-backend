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
exports.DashboardUnitsService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const response_dto_1 = require("./dto/response.dto");
const upsert_mapping_1 = require("./mappings/upsert.mapping");
const units_repository_1 = require("./units.repository");
let DashboardUnitsService = class DashboardUnitsService {
    constructor(repository) {
        this.repository = repository;
    }
    async getDetail(unit_id) {
        const unit = await this.repository.findOneBy({ unit_id });
        return unit ? (0, class_transformer_1.plainToInstance)(response_dto_1.ResUnit, unit, {}) : null;
    }
    async getList(props) {
        let query = {
            where: {},
            order: {
                created_at: 'DESC',
            },
        };
        query = await this.repository.sort(query, props);
        query = await this.repository.paginate(query, props);
        if (props.property_id) {
            Object.assign(query.where, { property_id: props.property_id });
        }
        const searchData = await this.repository.findAndCount(query);
        let units = [];
        if (searchData[0].length) {
            units = searchData[0].map((unit) => {
                const mapData = (0, class_transformer_1.plainToInstance)(response_dto_1.ResUnit, unit, {});
                return mapData;
            });
        }
        return {
            data: units,
            count: searchData[1],
        };
    }
    async create(body, admin) {
        const unit = await (0, upsert_mapping_1.mapReqCreateToDB)(body, admin);
        const saveData = await this.repository.save(unit);
        body['unit_id'] = saveData.unit_id;
        await this.updateTotalUnit(unit.property_id);
        return body;
    }
    async update(body, admin) {
        const unit = await (0, upsert_mapping_1.mapReqUpdateToDB)(body, admin);
        await this.repository.update({ unit_id: unit.unit_id }, unit);
        await this.updateTotalUnit(unit.property_id);
        return body;
    }
    async delete(unit_id, admin) {
        const remove = await this.repository.softDelete({ unit_id });
        this.decreaseTotalUnit(unit_id);
        if (remove.affected > 0) {
            await this.repository.update({ unit_id }, { deleted_by: admin?.user?.username ?? 'system' });
        }
        return remove;
    }
    async updateTotalUnit(property_id) {
        const currentUnitTotal = await this.countUnitByPropertyId(property_id);
        await this.repository.updateTotalUnitProperties(property_id, currentUnitTotal);
        return currentUnitTotal;
    }
    async decreaseTotalUnit(unit_id) {
        const searchDelete = await this.getDeleteData(unit_id);
        if (searchDelete) {
            const currentUnitTotal = await this.countUnitByPropertyId(searchDelete.property_id);
            await this.repository.updateTotalUnitProperties(searchDelete.property_id, currentUnitTotal);
            return currentUnitTotal;
        }
        return null;
    }
    async getDeleteData(unit_id) {
        return await this.repository.findOneBy({ unit_id, deleted_at: (0, typeorm_1.Not)(null) });
    }
    async countUnitByPropertyId(property_id) {
        return await this.repository.count({ where: { property_id } });
    }
};
exports.DashboardUnitsService = DashboardUnitsService;
exports.DashboardUnitsService = DashboardUnitsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [units_repository_1.DashboardUnitsRepository])
], DashboardUnitsService);
//# sourceMappingURL=units.service.js.map