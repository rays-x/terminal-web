import clsx from 'clsx';
import React from 'react';
import s from './Table.module.scss';
import {TableContext} from './TableContext';

export function Table({
                        children,
                        columns,
                        minWidth,
                        className
                      }: {
  children: React.ReactNode;
  columns: string[];
  minWidth: string | number;
  className?: string;
}) {
  return (
    <TableContext.Provider value={{columns}}>
      <div className={clsx(s.Table, className)} style={{minWidth}}>
        {children}
      </div>
    </TableContext.Provider>
  );
}
