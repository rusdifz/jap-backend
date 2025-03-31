"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapInsertDB = mapInsertDB;
const common_1 = require("../../../../common");
async function mapInsertDB(file, property_id) {
    const host = process.env.URL_MEDIA;
    return {
        property_id: Number(property_id),
        host: host,
        path: file.destination,
        name: file.filename,
        type: file.mimetype.includes('image')
            ? common_1.MediaTypeEnum.IMAGE
            : common_1.MediaTypeEnum.VIDEO,
        mimetype: file.mimetype,
        full_url: `${host}/api/media/image/${file.filename}`,
    };
}
//# sourceMappingURL=upsert.mapping.js.map