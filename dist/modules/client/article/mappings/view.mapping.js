"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDbToResDetail = mapDbToResDetail;
exports.mapDbToResList = mapDbToResList;
const helpers_1 = require("../../../../common/helpers");
async function mapDbToResDetail(db) {
    return {
        slug: db.slug,
        content: db.content,
        title: db.title,
        thumbnail: db.thumbnail,
        updated_at: (0, helpers_1.dayjs)(db.updated_at).format('MMMM D, YYYY'),
        created_by: db.created_by,
        updated_by: db.updated_by,
    };
}
async function mapDbToResList(db) {
    const res = db.map((dt) => {
        return {
            slug: dt.slug,
            title: dt.title,
            thumbnail: dt.thumbnail,
            updated_at: (0, helpers_1.dayjs)(dt.updated_at).format('D MMM YYYY'),
            created_by: dt.created_by,
        };
    });
    return res;
}
//# sourceMappingURL=view.mapping.js.map