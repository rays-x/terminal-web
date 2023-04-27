export type Optional<T> = T | null | undefined;

export type SetStateFn<State> = (changer: (prevState: State) => State) => void;

export type AnyObject = {
  [key: number]: any;
  [key: string]: any;
};

export type Extends<Self extends {}, Base extends {}> = Omit<Base, keyof Self> &
  Self;
