import { spacing } from './base';

export interface GridProps {
  colsAmount?: number;
  gap?: typeof spacing;
}

export interface GridItemProps {
  colSpan?: number;
}
