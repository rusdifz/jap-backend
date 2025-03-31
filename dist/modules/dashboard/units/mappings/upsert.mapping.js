"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapReqCreateToDB = mapReqCreateToDB;
exports.mapReqUpdateToDB = mapReqUpdateToDB;
async function mapReqCreateToDB(body, admin) {
    return {
        property_id: body.property_id,
        size: body.size,
        floor: body.floor,
        condition: body.condition,
        available: body.available,
        status: body.status,
        rent_sqm: body.rent_sqm,
        pic_name: body.pic_name,
        pic_phone: body.pic_phone,
        created_by: admin?.user?.username ?? 'admin system',
    };
}
async function mapReqUpdateToDB(body, admin) {
    return {
        unit_id: body.unit_id,
        property_id: body.property_id,
        size: body.size,
        floor: body.floor,
        condition: body.condition,
        available: body.available,
        status: body.status,
        rent_sqm: body.rent_sqm,
        pic_name: body.pic_name,
        pic_phone: body.pic_phone,
        updated_by: admin?.user?.username ?? 'admin system',
    };
}
//# sourceMappingURL=upsert.mapping.js.map