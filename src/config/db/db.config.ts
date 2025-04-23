import { DbConfigInterface } from './db.interface';

import {
  ArticleDB,
  FeedbackDB,
  MediaDB,
  PropertiesDB,
  UnitsDB,
  UsersDB,
} from 'src/common';
export const dbConfig = (): DbConfigInterface => ({
  db: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: false,
    // synchronize: true, // disabled for auto migration syncronize
    synchronize: false, // disabled for auto migration syncronize
    // logging: true,
    entities: [ArticleDB, FeedbackDB, MediaDB, PropertiesDB, UnitsDB, UsersDB],
    // ssl: {
    //   rejectUnauthorized: false,
    // },
    // charset: 'utf8mb4_unicode_ci',
  },
});
