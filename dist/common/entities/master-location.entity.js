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
exports.MasterLocationDB = void 0;
const typeorm_1 = require("typeorm");
let MasterLocationDB = class MasterLocationDB {
};
exports.MasterLocationDB = MasterLocationDB;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], MasterLocationDB.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250 }),
    __metadata("design:type", String)
], MasterLocationDB.prototype, "location_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], MasterLocationDB.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], MasterLocationDB.prototype, "activate_home", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250 }),
    __metadata("design:type", String)
], MasterLocationDB.prototype, "url_image", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], MasterLocationDB.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], MasterLocationDB.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], MasterLocationDB.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], MasterLocationDB.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], MasterLocationDB.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], MasterLocationDB.prototype, "deleted_by", void 0);
exports.MasterLocationDB = MasterLocationDB = __decorate([
    (0, typeorm_1.Entity)({ name: 'master_location' })
], MasterLocationDB);
//# sourceMappingURL=master-location.entity.js.map