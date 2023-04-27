import clsx from 'clsx';
import React from 'react';
import s from './RowText.module.scss';

export function RowText({
                          children,
                          className,
                          ...props
                        }: {
  children?: string | null;
  className?: string;
} & any) {
  return (
    <p className={clsx(s.RowText, className)} {...props || {}}>
      {children}
    </p>
  );
}
