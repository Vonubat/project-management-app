export type TaskData = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
};

export type TaskParams = {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
};
