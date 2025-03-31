"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionUnitEnum = exports.PropertyTypeEnum = exports.PropertyStatusEnum = exports.LocationEnum = void 0;
var LocationEnum;
(function (LocationEnum) {
    LocationEnum["AMPERA"] = "Ampera";
    LocationEnum["BEKASI"] = "Bekasi";
    LocationEnum["JAKARTA_BARAT"] = "Jakarta Barat";
    LocationEnum["KEMANG"] = "Kemang";
    LocationEnum["KUNINGAN"] = "Kuningan";
    LocationEnum["MAMPANG"] = "Mampang";
    LocationEnum["SCBD"] = "SCBD";
    LocationEnum["SENAYAN"] = "Senayan";
    LocationEnum["SUDIRMAN"] = "Sudirman";
    LocationEnum["TANGERANG"] = "Tangerang";
    LocationEnum["TB_SIMATUPANG"] = "Tb Simatupang";
    LocationEnum["THAMRIN"] = "Thamrin";
})(LocationEnum || (exports.LocationEnum = LocationEnum = {}));
var PropertyStatusEnum;
(function (PropertyStatusEnum) {
    PropertyStatusEnum["LEASE"] = "Lease";
    PropertyStatusEnum["SALE"] = "Sale";
    PropertyStatusEnum["LEASED_OUT"] = "Leased Out";
})(PropertyStatusEnum || (exports.PropertyStatusEnum = PropertyStatusEnum = {}));
var PropertyTypeEnum;
(function (PropertyTypeEnum) {
    PropertyTypeEnum["OFFICE"] = "Office";
    PropertyTypeEnum["RESIDENTIAL"] = "Residential";
    PropertyTypeEnum["lANDED"] = "Landed";
    PropertyTypeEnum["RETAIL"] = "Retail";
    PropertyTypeEnum["COMMERCIAL"] = "Commercial";
})(PropertyTypeEnum || (exports.PropertyTypeEnum = PropertyTypeEnum = {}));
var ConditionUnitEnum;
(function (ConditionUnitEnum) {
    ConditionUnitEnum["BARE"] = "Bare";
    ConditionUnitEnum["SEMI_FITTED"] = "Semi Fitted";
    ConditionUnitEnum["FITTED"] = "Fitted";
    ConditionUnitEnum["FURNISHED"] = "Furnished";
    ConditionUnitEnum["UNFURNISHED"] = "Unfurnished";
    ConditionUnitEnum["PARTITION"] = "Partition";
    ConditionUnitEnum["GOOD"] = "Good";
})(ConditionUnitEnum || (exports.ConditionUnitEnum = ConditionUnitEnum = {}));
//# sourceMappingURL=property.enum.js.map