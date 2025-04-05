export function formatCurrency(value: string | number): string {
  const number = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(number)) {
    // throw new Error('Nilai tidak valid');
    return 'Rp.   0';
  }

  if (number === 0) {
    return 'Rp.   0';
  }

  //   return new Intl.NumberFormat('en-US').format(number);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR', // Ganti dengan USD/EUR jika perlu
    minimumFractionDigits: 0,
  }).format(number);
}
