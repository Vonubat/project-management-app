import { UserData } from './users';

export type BoardData = BoardParams & {
  _id: string;
};

export type BoardParams = {
  title: string;
  description: string;
  owner: string;
  users: UserData['_id'][];
};
