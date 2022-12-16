import React from 'react';
import s from './Pair.module.scss';
import {Image} from '../../Image';

// TODO: add default icon
export function Pair({children, icons}: { children: string; icons: [string, string] }) {
  return (
    <div className={s.Pair}>
      <div className={s.Pair__icons}>
        <Image className={s.Pair__icon} sources={[icons[0]]} altText={""} width={28}/>
        <Image className={s.Pair__icon_second} sources={[icons[1]]} altText={""} width={28}/>
      </div>
      <span className={s.Pair__text}>{children}</span>
    </div>
  );
}
