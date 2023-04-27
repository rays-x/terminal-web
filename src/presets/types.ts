import {StyledComponent} from 'styled-components';

/**
 * PresetType
 */
export type PT = string | { [key: string]: PT };

/**
 * SetPresetGroups
 */
export type SPG<Enum extends keyof any, Preset = Partial<PT>> = Record<
  Enum,
  Preset
>;

/**
 * SetComponentGroup
 */
export type SCG<Enum extends keyof any> = Record<
  Enum,
  StyledComponent<any, any>
>;

/**
 * Represents a type `T` where every property is optional.
 */
export declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends readonly (infer X)[]
      ? readonly DeepPartial<X>[]
      : DeepPartial<T[P]>;
};

// Analogues to array.prototype.shift
export type Shift<T extends any[]> = ((...t: T) => any) extends (
    first: any,
    ...rest: infer Rest
  ) => any
  ? Rest
  : never;

// use a distributed conditional type here
export type ShiftUnion<T> = T extends any[] ? Shift<T> : never;

export type DeepRequired<T, P extends string[]> = T extends object
  ? Omit<T, Extract<keyof T, P[0]>> &
  Required<{
    [K in Extract<keyof T, P[0]>]: NonNullable<
      DeepRequired<T[K], ShiftUnion<P>>
    >;
  }>
  : T;

export type DeepExclude<T, U> = T extends U
  ? never
  : T extends object
    ? {
      [K in keyof T]: DeepExclude<T[K], U>;
    }
    : T;

export type NonNullable<T> = Exclude<T, null | undefined>;

export type Writeable<T> = { -readonly [P in keyof T]-?: T[P] };

export type StyledType<Type> = {
  [Property in keyof Type as `$${string & Property}`]: Type[Property];
};
