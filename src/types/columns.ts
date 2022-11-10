import { BoardData } from './boards';

export type ColumnData = ColumnParams & {
  _id: string;
  boardId: BoardData['_id'];
};

export type ColumnParams = {
  title: string;
  order: number;
};

export type ColumnsSetUpdateParams = {
  _id: string;
  order: number;
};

export type ColumnsSetCreateParams = {
  title: string;
  order: number;
  boardId: BoardData['_id'];
};
