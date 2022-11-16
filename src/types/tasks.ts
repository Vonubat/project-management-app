import { BoardData } from './boards';
import { ColumnData } from './columns';
import { UserData } from './users';

export type TaskData = TaskParamsCreate & {
  _id: string;
  boardId: BoardData['_id'];
  columnId: ColumnData['_id'];
};

export type TaskParamsUpdate = TaskParamsCreate & {
  columnId: string;
};

export type TaskParamsCreate = {
  title: string;
  order: number;
  description: string;
  userId: UserData['_id'];
  users: UserData['_id'][];
};

export type AddTaskFields = {
  title: string;
  description: string;
  // users: UserData['_id'][];
};
