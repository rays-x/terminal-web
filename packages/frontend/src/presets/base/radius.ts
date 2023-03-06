import {define} from '../../utils/types/define';

export const radius = define<Record<string | number, string>>()({
  none: '0',
  4: '4px',
  6: '6px',
  8: '8px',
  10: '10px',
  12: '12px',
  14: '14px',
  16: '16px',
  20: '20px',
  24: '24px',
  32: '32px',
  medium: '8px',
  circle: '50%'
});
