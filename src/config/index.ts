import { dbConfig } from './db/db.config';

export const configIndex = {
  isGlobal: true,
  load: [dbConfig],
};
