"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDbToResDetail = mapDbToResDetail;
exports.mapDbToResList = mapDbToResList;
const common_1 = require("../../../../common");
async function mapDbToResDetail(db) {
    return {
        id: db.id,
        location_name: db.location_name,
        position: db.position,
        activate_home: db.activate_home,
        url_image: db.url_image,
        created_at: (0, common_1.dayjs)(db.created_at).format('MMMM D, YYYY'),
        updated_at: (0, common_1.dayjs)(db.updated_at).format('MMMM D, YYYY'),
    };
}
async function mapDbToResList(dbs) {
    const resp = dbs.map((db) => {
        return {
            id: db.id,
            location_name: db.location_name,
            position: db.position,
            activate_home: db.activate_home,
            created_at: (0, common_1.dayjs)(db.created_at).format('MMMM D, YYYY'),
            updated_at: (0, common_1.dayjs)(db.updated_at).format('MMMM D, YYYY'),
        };
    });
    return resp;
}
//# sourceMappingURL=view.mapping.js.map