"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaReferenceType = exports.MimeTypeEnum = exports.MediaTypeEnum = void 0;
var MediaTypeEnum;
(function (MediaTypeEnum) {
    MediaTypeEnum["IMAGE"] = "image";
    MediaTypeEnum["VIDEO"] = "video";
})(MediaTypeEnum || (exports.MediaTypeEnum = MediaTypeEnum = {}));
var MimeTypeEnum;
(function (MimeTypeEnum) {
    MimeTypeEnum["PNG"] = "image/png";
    MimeTypeEnum["JPG"] = "image/jpg";
    MimeTypeEnum["JPEG"] = "image/jpeg";
    MimeTypeEnum["MP4"] = "video/mp4";
    MimeTypeEnum["MPEG"] = "video/mpeg";
    MimeTypeEnum["WEBM"] = "video/webm";
})(MimeTypeEnum || (exports.MimeTypeEnum = MimeTypeEnum = {}));
var MediaReferenceType;
(function (MediaReferenceType) {
    MediaReferenceType["ARTICLE"] = "article";
    MediaReferenceType["PROPERTY"] = "property";
    MediaReferenceType["FEEDBACK"] = "feedback";
    MediaReferenceType["USER"] = "user";
    MediaReferenceType["MASTER_LOCATION"] = "master location";
    MediaReferenceType["ACTIVITY"] = "activity";
})(MediaReferenceType || (exports.MediaReferenceType = MediaReferenceType = {}));
//# sourceMappingURL=media.enum.js.map