import clsx from 'clsx';
import React from 'react';
import s from './HeaderCell.module.scss';

export function HeaderCell({
                             children,
                             isSorted,
                             sortDescending,
                             onSort
                           }: {
  children: string;
  isSorted?: boolean;
  sortDescending?: boolean;
  onSort?: () => void;
}) {
  return (
    <div className={clsx(s.HeaderCell, {[s.HeaderCell_hasSort]: !!onSort})} onClick={onSort}>
      <span>{children}</span>
      {onSort && (
        <div
          className={clsx(s.HeaderCell__sort, {
            [s.HeaderCell__sort_isDescending]: isSorted && sortDescending,
            [s.HeaderCell__sort_isAscending]: isSorted && !sortDescending
          })}
        />
      )}
    </div>
  );
}
