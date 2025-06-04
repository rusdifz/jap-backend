"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDbToResList = mapDbToResList;
async function mapDbToResList(dbs) {
    const resp = dbs.map((db) => {
        return {
            id: db.id,
            location_name: db.location_name,
            position: db.position,
            url_image: db.url_image,
            activate_home: db.activate_home,
        };
    });
    return resp;
}
//# sourceMappingURL=view.mapping.js.map