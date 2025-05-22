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
exports.ClientFeedbackController = void 0;
const common_1 = require("@nestjs/common");
const request_dto_1 = require("./dto/request.dto");
const feedback_service_1 = require("./feedback.service");
let ClientFeedbackController = class ClientFeedbackController {
    constructor(service) {
        this.service = service;
    }
    async getList(query) {
        return await this.service.getList(query);
    }
};
exports.ClientFeedbackController = ClientFeedbackController;
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetListFeedbackDTO]),
    __metadata("design:returntype", Promise)
], ClientFeedbackController.prototype, "getList", null);
exports.ClientFeedbackController = ClientFeedbackController = __decorate([
    (0, common_1.Controller)('client/feedback'),
    __metadata("design:paramtypes", [feedback_service_1.ClientFeedbackService])
], ClientFeedbackController);
//# sourceMappingURL=feedback.controller.js.map