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
exports.BaseRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let BaseRepository = class BaseRepository extends typeorm_1.Repository {
    constructor(target, dtSource) {
        super(target, dtSource.createEntityManager(), dtSource.createQueryRunner());
        this.dataSource = dtSource;
    }
    async softDeleteAndLog(entity) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            await queryRunner.startTransaction();
            await queryRunner.manager.getRepository(this.target).save(entity);
            const softDelete = await queryRunner.manager
                .getRepository(this.target)
                .softRemove(entity);
            await queryRunner.commitTransaction();
            return softDelete;
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException('Transaction failed');
        }
        finally {
            await queryRunner.release();
        }
    }
    async sort(query, props) {
        if (props.sort && props.order) {
            Object.assign(query, {
                order: {
                    [props.sort]: props.order.toLowerCase() === 'asc' ? 'ASC' : 'DESC',
                },
            });
        }
        return query;
    }
    async paginate(query, props) {
        if (props.limit) {
            Object.assign(query, { take: props.limit });
        }
        if (props.page) {
            Object.assign(query, { skip: (props.page - 1) * props.limit });
        }
        return query;
    }
};
exports.BaseRepository = BaseRepository;
exports.BaseRepository = BaseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, typeorm_1.DataSource])
], BaseRepository);
//# sourceMappingURL=base.repository.js.map