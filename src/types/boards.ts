export type BoardData = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export type BoardParams = {
  title: string;
  owner: string;
  users: string[];
};
