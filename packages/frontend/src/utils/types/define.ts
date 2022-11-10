export function define<Base>() {
  return function _define<T extends Base>(x: T) {
    return x;
  };
}
