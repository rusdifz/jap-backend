import { DbConfigInterface } from './db.interface';

import {
  ArticleDB,
  FeedbackDB,
  MediaDB,
  PropertiesDB,
  UnitsDB,
  UsersDB,
  MasterAmenitiesDB,
  MasterLocationDB,
  PropertyPicDB,
} from 'src/common';

export const dbConfig = (): DbConfigInterface => ({
  db: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: false, // disabled for auto migration syncronize
    logging: false,
    entities: [
      ArticleDB,
      FeedbackDB,
      MediaDB,
      PropertiesDB,
      UnitsDB,
      UsersDB,
      MasterAmenitiesDB,
      MasterLocationDB,
      // PropertyPicDB,
    ],
    ssl: {
      rejectUnauthorized: false,
    },
    // charset: 'utf8mb4_unicode_ci',
  },
});
