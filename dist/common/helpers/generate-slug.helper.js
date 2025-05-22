"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = generateSlug;
function generateSlug(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/\s/g, '-')
        .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '-')
        .replace(/-{2,}/g, '-');
}
//# sourceMappingURL=generate-slug.helper.js.map