import clsx from 'clsx';
import React from 'react';
import s from './PercentageChange.module.scss';
import {toFixedToken} from '../../../../utils/diff';

export function PercentageChange({children}: { children?: number | null }) {
  const value = toFixedToken(children, 1);
  const isPositive = value > 0;
  const isNegative = value < 0;
  return (
    <div
      className={clsx(s.PercentageChange, {
        [s.PercentageChange_isPositive]: isPositive,
        [s.PercentageChange_isNegative]: isNegative
      })}>
      {value}%
    </div>
  );
}
