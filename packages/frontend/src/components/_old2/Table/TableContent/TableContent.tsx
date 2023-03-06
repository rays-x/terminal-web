import React from 'react';
import s from './TableContent.module.scss';

export function TableContent({children}: { children: React.ReactNode }) {
  return <div className={s.TableContent}>{children}</div>;
}
