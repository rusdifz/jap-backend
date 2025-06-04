"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configIndex = void 0;
const db_config_1 = require("./db/db.config");
const redis_config_1 = require("./redis/redis.config");
exports.configIndex = {
    isGlobal: true,
    load: [db_config_1.dbConfig, redis_config_1.redisConfig],
};
//# sourceMappingURL=index.js.map