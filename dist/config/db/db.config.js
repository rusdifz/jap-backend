"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const common_1 = require("../../common");
const dbConfig = () => ({
    db: {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
        entities: [
            common_1.ArticleDB,
            common_1.FeedbackDB,
            common_1.MediaDB,
            common_1.PropertiesDB,
            common_1.UnitsDB,
            common_1.UsersDB,
            common_1.MasterAmenitiesDB,
            common_1.MasterLocationDB,
            common_1.PropertyPicDB,
        ],
    },
});
exports.dbConfig = dbConfig;
//# sourceMappingURL=db.config.js.map