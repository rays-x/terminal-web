import clsx from 'clsx';
import React from 'react';
import s from './UnitValue.module.scss';
import { formatNumber } from '../../../../utils/formatNumber';

export function UnitValue({
  children,
  unit,
  decimals = 2,
  className
}: {
  children?: number | null;
  unit?: string;
  decimals?: number;
  className?: string;
}) {
  return (
    <div className={clsx(s.UnitValue, className)}>
      {!unit && '$'}
      {formatNumber(children, decimals, true)}
      {unit && ` ${unit}`}
    </div>
  );
}
