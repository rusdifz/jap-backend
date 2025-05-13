import { dbConfig } from './db/db.config';
import { redisConfig } from './redis/redis.config';

export const configIndex = {
  isGlobal: true,
  load: [dbConfig, redisConfig],
};
