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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardPropertiesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const typeorm_3 = require("@nestjs/typeorm");
const common_2 = require("../../../common");
let DashboardPropertiesRepository = class DashboardPropertiesRepository extends common_2.BaseRepository {
    constructor(dataSource, picEntity) {
        super(common_2.PropertiesDB, dataSource);
        this.picEntity = picEntity;
    }
    async findListPic(props) {
        let query = {
            where: {
                property_id: props.property_id,
            },
        };
        query = await this.sort(query, props);
        query = await this.paginate(query, props);
        const findData = await this.picEntity.findAndCount(query);
        const resp = {
            data: findData[0],
            count: findData[1],
        };
        return resp;
    }
    async savePic(data) {
        return await this.picEntity.save(data);
    }
    async updatePic(data, pic_id) {
        return await this.picEntity.update({ id: pic_id }, data);
    }
    async deletePic(pic_id) {
        return await this.picEntity.delete({ id: pic_id });
    }
};
exports.DashboardPropertiesRepository = DashboardPropertiesRepository;
exports.DashboardPropertiesRepository = DashboardPropertiesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __param(1, (0, typeorm_3.InjectRepository)(common_2.PropertyPicDB)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        typeorm_1.Repository])
], DashboardPropertiesRepository);
//# sourceMappingURL=properties.repository.js.map