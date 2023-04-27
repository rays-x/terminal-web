/**
 * Joins truthy array elements
 * @param array - массив
 * @param glue - строка-соединитель
 */
export function joinNonEmpty(array: any[], glue: string): string {
  return array.filter(Boolean).join(glue);
}
