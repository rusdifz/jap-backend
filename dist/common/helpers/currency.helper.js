"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrency = formatCurrency;
function formatCurrency(value) {
    const number = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(number)) {
        return 'Rp.   0';
    }
    if (number === 0) {
        return 'Rp.   0';
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
}
//# sourceMappingURL=currency.helper.js.map