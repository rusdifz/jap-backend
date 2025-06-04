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
exports.DashboardMasterLocationService = void 0;
const common_1 = require("@nestjs/common");
const view_mapping_1 = require("./mappings/view.mapping");
const master_location_repository_1 = require("./master-location.repository");
let DashboardMasterLocationService = class DashboardMasterLocationService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(data, admin) {
        console.log('admin', admin);
        const mappingData = {
            location_name: data.location_name,
            position: data.position,
            activate_home: data.activate_homepage,
            url_image: '',
            created_by: admin.user.username,
        };
        const saveData = await this.repository.save(mappingData);
        data['id'] = saveData.id;
        return data;
    }
    async update(data, admin) {
        const mapData = {
            location_name: data.location_name,
            position: data.position,
            activate_home: data.activate_homepage,
            updated_by: admin.user.username,
        };
        await this.repository.update({ id: data.id }, mapData);
        return data;
    }
    async delete(id, admin) {
        const deleteData = await this.repository.update({ id }, { deleted_by: admin?.user?.username ?? 'system' });
        if (deleteData.affected > 0) {
            return {};
        }
        throw new Error('data master location ' + id + ' not deleted');
    }
    async getDetail(id) {
        const query = {
            where: {
                id,
            },
        };
        const findData = await this.repository.findOne(query);
        return findData ? await (0, view_mapping_1.mapDbToResDetail)(findData) : null;
    }
    async getList(props) {
        let query = {};
        props.sort = 'position';
        props.order = 'asc';
        query = await this.repository.sort(query, props);
        query = await this.repository.paginate(query, props);
        const findData = await this.repository.findAndCount(query);
        const respData = findData.length > 0 ? await (0, view_mapping_1.mapDbToResList)(findData[0]) : [];
        return { data: respData, count: findData[1] };
    }
    async updateImage(id, url_image) {
        const data = await this.repository.update({ id }, { url_image });
        return data;
    }
    async getListPosition() {
    }
};
exports.DashboardMasterLocationService = DashboardMasterLocationService;
exports.DashboardMasterLocationService = DashboardMasterLocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [master_location_repository_1.DashboardMasterLocationsRepository])
], DashboardMasterLocationService);
//# sourceMappingURL=master-location.service.js.map