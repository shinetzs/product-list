export const discount = (normalPrice: number, offerPrice: number) => {
  if (normalPrice === 0) return '0.00%';
  const result = ((normalPrice - offerPrice) / normalPrice) * 100;
  return `${result.toFixed(2)}%`;
};

export const formatCurrency = (value: number) => {
  if (value === null || value === undefined || isNaN(value)) return '$ -';
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(value);
};
