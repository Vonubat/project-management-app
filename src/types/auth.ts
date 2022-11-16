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

export type SignInFormFields = {
  login: string;
  password: string;
};

export type SignUpFormFields = {
  name: string;
  login: string;
  password: string;
};
