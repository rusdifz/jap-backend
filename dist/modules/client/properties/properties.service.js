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
exports.ClientPropertiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const view_mapping_1 = require("./mappings/view.mapping");
const properties_repository_1 = require("./properties.repository");
const common_2 = require("../../../common");
let ClientPropertiesService = class ClientPropertiesService {
    constructor(repository) {
        this.repository = repository;
    }
    async getDetail(slug) {
        const query = {
            where: {
                slug,
                status_publish: common_2.StatusPublishEnum.PUBLISH,
                images: {
                    reference_type: common_2.MediaReferenceType.PROPERTY,
                },
            },
            order: {
                units: {
                    created_at: 'ASC',
                },
            },
            relations: {
                units: true,
                images: true,
            },
        };
        const property = await this.repository.findOne(query);
        return property ? await (0, view_mapping_1.mapDbToResDetail)(property) : null;
    }
    async getList(props) {
        console.log('props get list client', props);
        let query = {
            where: {
                status_publish: common_2.StatusPublishEnum.PUBLISH,
            },
            order: {
                updated_at: 'DESC',
            },
        };
        query = await this.repository.sort(query, props);
        query = await this.repository.paginate(query, props);
        if (props.amenities) {
            Object.assign(query.where, { amenities: (0, typeorm_1.Like)(`%${props.amenities}%`) });
        }
        if (props.location) {
            if (props.location == 'PIM, Kebayoran & Blok M') {
                props.location = common_2.LocationEnum.PBK;
            }
            Object.assign(query.where, { location: props.location.toLowerCase() });
        }
        if (props.property_type) {
            Object.assign(query.where, {
                property_type: (0, typeorm_1.Like)(`%${props.property_type.toLowerCase()}%`),
            });
        }
        if (props.property_status) {
            Object.assign(query.where, { units: { status: props.property_status } });
        }
        if (props.search_keyword) {
            Object.assign(query.where, { name: (0, typeorm_1.Like)(`%${props.search_keyword}%`) });
        }
        if (props.id_except) {
            Object.assign(query.where, {
                property_id: (0, typeorm_1.Not)((0, typeorm_1.In)([props.id_except])),
            });
        }
        const search = await this.repository.findAndCount(query);
        const properties = search[0].length > 0 ? await (0, view_mapping_1.mapDbToResList)(search[0]) : [];
        return { data: properties, count: search[1] };
    }
};
exports.ClientPropertiesService = ClientPropertiesService;
exports.ClientPropertiesService = ClientPropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [properties_repository_1.ClientPropertiesRepository])
], ClientPropertiesService);
//# sourceMappingURL=properties.service.js.map