"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapReqCreateToDB = mapReqCreateToDB;
exports.mapReqUpdateToDB = mapReqUpdateToDB;
async function mapReqCreateToDB(payload, username_login) {
    return {
        title: payload.title,
        slug: payload['slug'],
        content: payload.content,
        thumbnail: payload.thumbnail,
        url_youtube: payload.url_youtube,
        status_publish: payload.status_publish,
        tags: payload.tags,
        created_by: username_login ?? 'admin system',
    };
}
async function mapReqUpdateToDB(payload, username_login) {
    return {
        article_id: payload.article_id,
        title: payload.title,
        slug: payload['slug'],
        content: payload.content,
        thumbnail: payload.thumbnail,
        url_youtube: payload.url_youtube,
        status_publish: payload.status_publish,
        tags: payload.tags,
        updated_by: username_login ?? 'admin system',
    };
}
//# sourceMappingURL=upsert.mapping.js.map