import { ColumnData } from 'types/columns';

export function moveItem(array: ColumnData[], from: number, to: number) {
  array.splice(to, 0, array.splice(from, 1)[0]);
}
