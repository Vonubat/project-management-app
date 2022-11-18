import { TOKEN } from 'constants/constants';
import { LocalStorageUserData } from 'types/utilTypes';
import { parseJwt } from './parseJwt';

export const getUserDataFromLocalStorage = (): LocalStorageUserData => {
  const jwt = localStorage.getItem(TOKEN);

  let login = '';
  let userId = '';

  if (jwt) {
    const jwtBody = parseJwt(jwt);

    if (jwtBody) {
      login = jwtBody.login;
      userId = jwtBody.id;
    }
  }

  return { login, userId };
};
