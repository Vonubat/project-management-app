import { AuthState } from 'types/auth';

import { getUserDataFromLocalStorage } from './getUserDataFromLocalStorage';

export const getAuthSliceInitialState = (): AuthState => {
  const { login, userId } = getUserDataFromLocalStorage();

  return {
    isAuth: !!userId,
    name: '',
    login,
    userId,
    created: null,
  };
};
