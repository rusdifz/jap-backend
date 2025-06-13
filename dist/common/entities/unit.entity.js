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
exports.UnitsDB = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const property_entity_1 = require("./property.entity");
let UnitsDB = class UnitsDB {
};
exports.UnitsDB = UnitsDB;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UnitsDB.prototype, "unit_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], UnitsDB.prototype, "property_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.PropertyStatusEnum,
        default: enums_1.PropertyStatusEnum.LEASE,
    }),
    __metadata("design:type", String)
], UnitsDB.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], UnitsDB.prototype, "floor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], UnitsDB.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.ConditionUnitEnum,
        default: enums_1.ConditionUnitEnum.BARE,
    }),
    __metadata("design:type", String)
], UnitsDB.prototype, "condition", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], UnitsDB.prototype, "available", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], UnitsDB.prototype, "rent_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250, nullable: true }),
    __metadata("design:type", String)
], UnitsDB.prototype, "pic_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250, nullable: true }),
    __metadata("design:type", String)
], UnitsDB.prototype, "pic_phone", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UnitsDB.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UnitsDB.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UnitsDB.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], UnitsDB.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], UnitsDB.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], UnitsDB.prototype, "deleted_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.PropertiesDB, (office) => office.units, {
        createForeignKeyConstraints: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'property_id', referencedColumnName: 'property_id' }),
    __metadata("design:type", property_entity_1.PropertiesDB)
], UnitsDB.prototype, "property", void 0);
exports.UnitsDB = UnitsDB = __decorate([
    (0, typeorm_1.Entity)({ name: 'units' })
], UnitsDB);
//# sourceMappingURL=unit.entity.js.map