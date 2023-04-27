export function avgBuy(
  arr: {
    price: string | number;
    qty: string | number;
  }[]
): number {
  return Number(
    arr.reduce((prev, next) => prev + Number(next.price) * Number(next.qty), 0) /
    arr.reduce((prev, next) => prev + Number(next.qty), 0)
  );
}