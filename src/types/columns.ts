export type ColumnData = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
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
  boardId: string;
};
