import React from 'react';
import s from './DropdownItem.module.scss';
import {Image} from '../Image';

export function DropdownItem({children, icon, onClick}: { children: string; icon: string; onClick: () => void }) {
  return (
    <div className={s.DropdownItem} onClick={onClick}>
      <Image sources={[icon]} altText={children} width={20} className={s.DropdownItem__icon}/>
      <span className={s.DropdownItem__text}>{children}</span>
    </div>
  );
}
