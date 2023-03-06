import React from 'react';
import s from './RowNumber.module.scss';

export function RowNumber({children}: { children: number }) {
  return <div className={s.RowNumber}>{children}</div>;
}
