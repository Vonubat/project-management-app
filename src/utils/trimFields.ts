import { EditBoardFormFields } from 'types/boards';
import { AddColumnFields } from 'types/columns';
import { TaskFields } from 'types/tasks';

type TrimParam = TaskFields | AddColumnFields | EditBoardFormFields;

export const trimFields = (data: TrimParam) => {
  for (const key in data) {
    data[key as keyof TrimParam] = data[key as keyof TrimParam].trim();
  }

  return data;
};
