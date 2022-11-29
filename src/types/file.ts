import { BoardData } from './boards';
import { TaskData } from './tasks';

export type FileData = {
  _id: string;
  name: string;
  taskId: TaskData['_id'];
  boardId: BoardData['_id'];
  path: string;
};
