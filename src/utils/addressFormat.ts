export const addressFormat = (address: string, totalLength = 16) =>
`${address.slice(0, Math.ceil(2 * totalLength / 3))}...${address.slice(-Math.floor(totalLength / 3))}`;
