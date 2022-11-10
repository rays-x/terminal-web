import {RefObject, useEffect} from 'react';

export const enum ChangeVariant {
  rise,
  fall,
  illuminated
}

export const getPercentVariant = (percent: string): ChangeVariant =>
  String(percent).includes('-') ? ChangeVariant.fall : (
    Number(percent) === 0
      ? ChangeVariant.illuminated
      : ChangeVariant.rise
  );
export const getPercentValue = (percent: number): number => Math.abs(percent);

export const headerProps = (props, {column}) =>
  getStyles(props, column.align, column.justify, column.whiteSpace);

export const cellProps = (props, {cell}) =>
  getStyles(
    props,
    cell.column.align,
    cell.column.justify,
    cell.column.whiteSpace
  );

const getStyles = (
  props,
  align = 'center',
  justify = 'flex-start',
  whiteSpace = 'normal'
) => [
  props,
  {
    style: {
      display: 'flex',
      justifyContent: justify,
      alignItems: align,
      //todo: gonna be nice if it'd work properly >.<
      whiteSpace
    }
  }
];

export function useOutsideAllEvent(
  refs: RefObject<HTMLDivElement>[],
  event: () => void
) {
  useEffect(() => {
    function handleClickOutside(mouseEvent) {
      if (
        refs.every(
          (ref) => ref.current && !ref.current.contains(mouseEvent.target)
        )
      ) {
        event();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [refs, event]);
}

export function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
