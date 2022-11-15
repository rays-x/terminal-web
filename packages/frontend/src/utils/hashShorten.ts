export function hashShorten(hash: string, leftOffset = 5, rightOffset = 5): string {
  return `${hash.substring(0, leftOffset)}...${hash.substring(hash.length - rightOffset)}`
}