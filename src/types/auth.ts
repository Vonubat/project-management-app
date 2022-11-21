export type AuthState = {
  isAuth: boolean;
  name: string;
  login: string;
  userId: string;
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
