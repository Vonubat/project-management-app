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
