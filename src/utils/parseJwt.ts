import { JwtBody } from 'types/utilTypes';

export const parseJwt = (token: string): JwtBody | null => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
