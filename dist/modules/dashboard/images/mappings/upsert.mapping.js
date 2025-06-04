"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapInsertDB = mapInsertDB;
const common_1 = require("../../../../common");
async function mapInsertDB(file, reference_id, reference_type, resp_cloudinary) {
    const host = process.env.URL_MEDIA;
    const url = new URL(resp_cloudinary.secure_url);
    const pathParts = url.pathname.split('/');
    const fileName = pathParts[pathParts.length - 1];
    return {
        reference_id: Number(reference_id),
        reference_type,
        host: host,
        path: resp_cloudinary.folder,
        public_id: resp_cloudinary.public_id,
        type: file.mimetype.includes('image')
            ? common_1.MediaTypeEnum.IMAGE
            : common_1.MediaTypeEnum.VIDEO,
        mimetype: file.mimetype,
        full_url: resp_cloudinary.secure_url,
        name: fileName,
    };
}
//# sourceMappingURL=upsert.mapping.js.map