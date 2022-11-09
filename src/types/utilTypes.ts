export type JwtBody = {
  exp: number;
  iat: number;
  id: string;
  login: string;
};

export type LocalStorageUserData = {
  id: string | null;
  login: string | null;
};
