export function formatTaka(value: string | number) {
  const number = Number(value);
  return Number.isFinite(number) ? `৳${number.toLocaleString('en-BD', { maximumFractionDigits: 0 })}` : 'Salary on request';
}

export function getInitials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map(piece => piece[0]?.toUpperCase() ?? '').join('');
}
