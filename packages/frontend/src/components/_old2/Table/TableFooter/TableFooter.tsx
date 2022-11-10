import clsx from 'clsx';
import React from 'react';
import s from './TableFooter.module.scss';
import { HELLIP } from '../../../../utils/UTF';
import NextIcon from './next';

export function TableFooter({
  showFrom,
  showTo,
  totalCount,
  query,
  onQueryChange,
  currentPage,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage
}: {
  showFrom?: number;
  showTo?: number;
  totalCount?: number;
  query: string;
  onQueryChange: (query: string) => void;
  currentPage: number;
  onFirstPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
}) {
  return (
    <div className={s.TableFooter}>
      {showFrom && !!showTo && totalCount && (
        <span className={s.TableFooter__text}>{`Showing ${showFrom} to ${showTo} of ${totalCount}`}</span>
      )}
      <input
        className={s.TableFooter__input}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={`Search${HELLIP}`}
      />
      <div className={s.TableFooter__pagination}>
        <div
          className={clsx(s.TableFooter__paginationButton, s.TableFooter__paginationButton_previous)}
          onClick={onFirstPage}>
          <NextIcon />
          <NextIcon />
        </div>
        <div
          className={clsx(s.TableFooter__paginationButton, s.TableFooter__paginationButton_previous)}
          onClick={onPreviousPage}>
          <NextIcon />
        </div>
        <span className={s.TableFooter__paginationText}>{`Page ${currentPage}`}</span>
        <div className={s.TableFooter__paginationButton} onClick={onNextPage}>
          <NextIcon />
        </div>
        <div className={s.TableFooter__paginationButton} onClick={onLastPage}>
          <NextIcon />
          <NextIcon />
        </div>
      </div>
    </div>
  );
}
