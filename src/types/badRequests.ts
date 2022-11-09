export type AbstractBadRequest = {
  statusCode: number;
  message: string;
};

export type UserWasNotFound = AbstractBadRequest;
export type BadRequest = AbstractBadRequest;
export type LoginAlreadyExist = AbstractBadRequest;
