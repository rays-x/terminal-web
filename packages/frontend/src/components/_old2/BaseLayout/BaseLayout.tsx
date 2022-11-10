import React from 'react';
import s from './BaseLayout.module.scss';
import { Header } from '../Header';

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.BaseLayout}>
      <Header />
      <main className={s.BaseLayout__content}>{children}</main>
    </div>
  );
}
