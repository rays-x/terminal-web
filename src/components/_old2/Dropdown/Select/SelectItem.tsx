import React from 'react';
import s from './SelectItem.module.scss';

export function SelectItem({children, onClick}: { children: string; onClick: () => void }) {
  return (
    <div className={s.SelectItem} onClick={onClick}>
      {children}
    </div>
  );
}
