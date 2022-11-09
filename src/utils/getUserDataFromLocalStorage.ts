import { TOKEN } from 'constants/constants';
import { LocalStorageUserData } from 'types/utilTypes';
import { parseJwt } from './parseJwt';

export const getUserDataFromLocalStorage = (): LocalStorageUserData => {
  const jwt = localStorage.getItem(TOKEN);

  let login = null;
  let id = null;

  if (jwt) {
    const jwtBody = parseJwt(jwt);

    if (jwtBody) {
      login = jwtBody.login;
      id = jwtBody.id;
    }
  }

  return { login, id };
};
