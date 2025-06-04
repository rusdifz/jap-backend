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
exports.IsUniqueConstraint = void 0;
exports.IsUnique = IsUnique;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
const helpers_1 = require("../helpers");
let IsUniqueConstraint = class IsUniqueConstraint {
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    async validate(value, args) {
        const [entityClass, entityProperty] = args.constraints;
        const repositorys = this.entityManager.getRepository(entityClass);
        const where = {
            where: { [entityProperty]: value },
        };
        if (args.object['property_id']) {
            where.where['property_id'] = (0, typeorm_2.Not)(args.object['property_id']);
        }
        if (args.object['unit_id']) {
            where.where['unit_id'] = (0, typeorm_2.Not)(args.object['unit_id']);
        }
        if (args.object['article_id']) {
            where.where['article_id'] = (0, typeorm_2.Not)(args.object['article_id']);
        }
        if (entityProperty == 'title' || entityProperty == 'name') {
            args.object['slug'] = (0, helpers_1.generateSlug)(value);
            delete where.where['title'];
            where.where['slug'] = args.object['slug'];
        }
        if (args.object['id']) {
            where.where['id'] = (0, typeorm_2.Not)(args.object['id']);
        }
        const foundEntity = await repositorys.findOne(where);
        return !foundEntity;
    }
    defaultMessage(args) {
        return `${args.property} must be unique`;
    }
};
exports.IsUniqueConstraint = IsUniqueConstraint;
exports.IsUniqueConstraint = IsUniqueConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], IsUniqueConstraint);
function IsUnique(entityClass, field, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [entityClass, field, validationOptions],
            validator: IsUniqueConstraint,
        });
    };
}
//# sourceMappingURL=is-unique.decorator.js.map