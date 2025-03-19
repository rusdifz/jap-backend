import { DbConfigInterface } from './db.interface';

// import { ArticleDB } from '../../modules/article/entities/article.entity';
// import { MediaDB } from '../../modules/media/entities/media.entity';
// import { PropertiesDB } from '../../modules/properties/enitties/property.entity';
// import { UnitsDB } from '../../modules/units/entites/unit.entity';
// import { UsersDB } from '../../modules/user/entities/user.entity';

import { ArticleDB, MediaDB, PropertiesDB, UnitsDB, UsersDB } from 'src/common';

export const dbConfig = (): DbConfigInterface => ({
  db: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true, // disabled for auto migration syncronize
    logging: false,
    entities: [ArticleDB, MediaDB, PropertiesDB, UnitsDB, UsersDB],
    ssl: {
      rejectUnauthorized: false,
    },
    // charset: 'utf8mb4_unicode_ci',
  },
});
