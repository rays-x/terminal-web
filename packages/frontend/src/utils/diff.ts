export function toFixedToken(v: number,d=0): number{
  return Math.trunc(v*Math.pow(10,d))/Math.pow(10,d);
}
export function diff(a: string|number,b: string|number,d=1): number{
  return toFixedToken(((Number(b)-Number(a))/Number(a))*100,d);
}