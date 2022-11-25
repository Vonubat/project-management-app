import { SocketAction } from 'constants/constants';

export type BoardsContentSocketPayload = {
  action: SocketAction;
  users: string[];
  ids: string[];
  guid: string;
  notify: boolean;
  initUser: string;
};

export type UsersSocketPayload = {
  action: SocketAction;
  ids: string[];
};
