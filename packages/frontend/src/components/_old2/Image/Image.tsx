import clsx from 'clsx';
import React, { useState } from 'react';
import s from './Image.module.scss';

// TODO: add loading state and error handling
export function Image({
  sources,
  altText,
  width,
  height,
  className
}: {
  sources: string[];
  altText: string;
  width: number;
  height?: number;
  className?: string;
}) {
  const [sourceIndex, setSourceIndex] = useState(0);
  return (
    <img
      width={width}
      height={height || width}
      className={clsx(s.Image, className)}
      src={sources[sourceIndex]}
      onError={() => sourceIndex + 1 < sources.length && setSourceIndex(sourceIndex + 1)}
      alt={altText}
    />
  );
}
