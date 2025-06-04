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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth_repository_1 = require("./auth.repository");
let AuthService = class AuthService {
    constructor(repository) {
        this.repository = repository;
    }
    async login(payload) {
        let queryWhere = payload.email
            ? { email: payload.email }
            : { username: payload.username };
        const user = await this.repository.findOneBy(queryWhere);
        if (user) {
            const isMatchPassword = await bcrypt.compare(payload.password, user.password);
            if (isMatchPassword) {
                delete user.password;
                const token = jwt.sign({ user }, process.env.JWT_KEY);
                return token;
            }
        }
        throw new common_1.HttpException('Incorrect username or password', common_1.HttpStatus.BAD_REQUEST);
    }
    async signup(payload, admin) {
        payload.password = await bcrypt.hash(payload.password, 10);
        payload['created_by'] = admin?.user?.username ?? 'system';
        await this.repository.save(payload);
        delete payload.password;
        return payload;
    }
    async changePassword(payload) {
        payload.password = await bcrypt.hash(payload.password, 10);
        await this.repository.update({ username: payload.username }, { password: payload.password });
        const user = await this.repository.findOneBy({
            username: payload.username,
        });
        delete user.password;
        const token = jwt.sign({ user }, process.env.JWT_KEY);
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map