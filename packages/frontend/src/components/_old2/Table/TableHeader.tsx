import React, {useContext} from 'react';
import s from './TableHeader.module.scss';
import {TableContext} from './TableContext';

export function TableHeader({children}: { children: React.ReactNode }) {
  const {columns} = useContext(TableContext);
  return (
    <div className={s.TableHeader} style={{gridTemplateColumns: columns.join(' ')}}>
      {children}
    </div>
  );
}
