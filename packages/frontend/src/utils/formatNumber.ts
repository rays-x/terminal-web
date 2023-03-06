import {EMDASH, QUARTERSP} from './UTF';

export function formatNumber(number: number | null | undefined, decimals = 2, hideTrailingZeroes = false) {
  if(number === null || number === undefined) return EMDASH;
  const withTrailingZeroes = Number(number).toFixed(decimals);
  const baseNumber = hideTrailingZeroes ? String(parseFloat(withTrailingZeroes)) : withTrailingZeroes;
  const formattedNum = baseNumber.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1' + QUARTERSP);
  if(formattedNum === 'NaN') return EMDASH;
  if(formattedNum === 'Infinity') return EMDASH;
  return formattedNum;
}
