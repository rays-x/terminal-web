import React from 'react';
import s from './Token.module.scss';
import { Image } from '../../Image';

// TODO: add default icon
export function Token({ children, icons }: { children: string; icons: string[] }) {
  return (
    <div className={s.Token}>
      <Image className={s.Token__icon} sources={icons} altText={children} width={28} />
      <span className={s.Token__text}>{children}</span>
    </div>
  );
}
