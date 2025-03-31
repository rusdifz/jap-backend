"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDbToResDetail = mapDbToResDetail;
exports.mapDbToResList = mapDbToResList;
const common_1 = require("../../../../common");
async function mapDbToResDetail(db) {
    return {
        article_id: Number(db.article_id),
        content: db.content,
        title: db.title,
        thumbnail: db.thumbnail,
        status_publish: db.status_publish,
        created_at: (0, common_1.dayjs)(db.created_at).format('MMMM D, YYYY'),
        updated_at: (0, common_1.dayjs)(db.updated_at).format('MMMM D, YYYY'),
        created_by: db.created_by,
        updated_by: db.updated_by,
    };
}
async function mapDbToResList(db) {
    const res = db.map((dt) => {
        return {
            article_id: Number(dt.article_id),
            title: dt.title,
            thumbnail: dt.thumbnail,
            status_publish: dt.status_publish,
            created_at: (0, common_1.dayjs)(dt.created_at).format('MMMM D, YYYY'),
            created_by: dt.created_by,
        };
    });
    return res;
}
//# sourceMappingURL=view.mapping.js.map