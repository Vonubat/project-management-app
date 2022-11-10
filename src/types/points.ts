export type PointsData = {
  _id: string;
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
};

export type PointsParams = {
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
};

export type PointsSetParams = {
  _id: string;
  done: boolean;
};

export type PointUpdateParams = {
  title: string;
  done: boolean;
};
