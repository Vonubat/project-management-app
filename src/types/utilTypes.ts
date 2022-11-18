export type JwtBody = {
  exp: number;
  iat: number;
  id: string;
  login: string;
};

export type LocalStorageUserData = {
  userId: string;
  login: string;
};
