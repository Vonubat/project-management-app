import { ColumnData } from 'types/columns';
import { TaskData } from 'types/tasks';

type SortItem = ColumnData | TaskData;

export const sortOrder = (a: SortItem, b: SortItem) => {
  const res = a.order - b.order;

  if (res > 0) return 1;

  if (res < 0) return -1;

  return 0;
};
