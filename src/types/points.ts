import { BoardData } from './boards';
import { TaskData } from './tasks';

export type PointsData = PointsParams & {
  _id: string;
};

export type PointsSetParams = Pick<PointsData, '_id' | 'done'>;

export type PointUpdateParams = Pick<PointsData, 'title' | 'done'>;

export type PointsParams = {
  title: string;
  taskId: TaskData['_id'];
  boardId: BoardData['_id'];
  done: boolean;
};
