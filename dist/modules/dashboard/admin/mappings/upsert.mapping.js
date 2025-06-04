"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapReqUpdateToDB = mapReqUpdateToDB;
async function mapReqUpdateToDB(body, admin) {
    return {
        id: body.id,
        email: body.email,
        phone_number: body.phone_number,
        first_name: body.first_name,
        last_name: body.last_name,
        profile_picture: body.profile_picture,
        role: body.role,
        address: body.address,
        updated_by: admin.user.username,
    };
}
//# sourceMappingURL=upsert.mapping.js.map