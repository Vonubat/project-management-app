import { BoardData } from './boards';
import { ColumnData } from './columns';
import { UserData } from './users';

export type CreateTaskParams = {
  title: string;
  description: string;
  users: Array<UserData['_id']>;
};

export type UpdateTaskParams = {
  title: string;
  description: string;
  users: Array<UserData['_id']>;
};

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

export type TaskFields = {
  title: string;
  description: string;
  // users: UserData['_id'][];
};

export type CurrentTaskInfo = {
  currentTaskId: TaskData['_id'];
  currentTaskTitle: TaskData['title'];
  currentTaskDescription: TaskData['description'];
};

export type UpdateTaskSetData = Array<{
  _id: string;
  order: number;
  columnId: string;
}>;

export type DropTaskItem = {
  id: string;
  order: number;
  columnId: string;
};

export type DndTaskData = {
  dragOrder: number;
  dragColumnId: string;
  dropOrder: number;
  dropColumnId: string;
};

export type UpdateLocalTaskParam = {
  taskId: string;
  data: UpdateTaskParams;
};
