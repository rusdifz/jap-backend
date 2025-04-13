"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapReqCreateToDB = mapReqCreateToDB;
exports.mapReqUpdateToDB = mapReqUpdateToDB;
async function mapReqCreateToDB(body, admin) {
    return {
        profile_image: body.profile_image,
        profile_name: body.profile_name,
        comment: body.comment,
        status_publish: body.status_publish,
        created_by: admin?.user?.username ?? 'admin system',
    };
}
async function mapReqUpdateToDB(body, admin) {
    return {
        feedback_id: body.feedback_id,
        profile_image: body.profile_image,
        profile_name: body.profile_name,
        comment: body.comment,
        status_publish: body.status_publish,
        updated_by: admin?.user?.username ?? 'admin system',
    };
}
//# sourceMappingURL=upsert.mapping.js.map