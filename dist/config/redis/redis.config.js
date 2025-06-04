"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = void 0;
const redisConfig = () => ({
    redis: [
        {
            name: 'master',
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD,
        },
        {
            name: 'slave',
            host: process.env.REDIS_HOST_SLAVE,
            port: process.env.REDIS_PORT_SLAVE,
            password: process.env.REDIS_PASSWORD_SLAVE,
        },
    ],
});
exports.redisConfig = redisConfig;
//# sourceMappingURL=redis.config.js.map