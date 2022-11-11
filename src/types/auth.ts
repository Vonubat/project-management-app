import { RegisterOptions } from 'react-hook-form';

export type AuthState = {
  isLoading: boolean;
  isAuth: boolean;
  name: string | null;
  login: string | null;
  userId: string | null;
  created: {
    name: string;
    login: string;
  } | null;
  error: string | null;
};

export type SignUpRequestData = {
  name: string;
  login: string;
  password: string;
};

export type SignUpOkResponseData = {
  _id: string;
  name: string;
  login: string;
};

export type SignInRequestData = {
  login: string;
  password: string;
};

export type SignInOkResponseData = {
  token: string;
};

export type SingInFormFields = {
  login: string;
  password: string;
};

export type SingUpFormFields = {
  login: string;
  name: string;
  password: string;
};

export type AuthInputName = 'name' | 'login' | 'password';

export type AuthInputOptions = {
  name: AuthInputName;
  label: string;
  type: 'password' | 'text';
  validationOptions: RegisterOptions;
};
