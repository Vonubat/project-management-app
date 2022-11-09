import { AuthState } from 'types/auth';
import { getUserDataFromLocalStorage } from './getUserDataFromLocalStorage';

export const getAuthSliseInitialState = (): AuthState => {
  const { login, id } = getUserDataFromLocalStorage();

  return {
    isLoading: false,
    isAuth: !!id,
    name: null,
    login: login,
    userId: id,
    created: null,
    error: null,
  };
};
