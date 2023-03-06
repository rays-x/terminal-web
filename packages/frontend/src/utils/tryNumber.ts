export function isValidNumber(n: any) {
  return typeof n == 'number' && !isNaN(n) && isFinite(n);
}

export function tryNumber(value: any): number | null;
export function tryNumber<D>(value: any, defaultValue: D): number | (D extends undefined ? null : D);
export function tryNumber<D>(value: any, defaultValue?: D): number | D | null {
  if(value === undefined || value === null || value === '') return defaultValue ?? null;
  const number = +value;
  if(isValidNumber(number)) return number;
  return defaultValue ?? null;
}
