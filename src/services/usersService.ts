import { AxiosResponse } from 'axios';
import { ApiRoutes } from 'constants/constants';
import { SignUpRequestData } from 'types/auth';
import { UserData } from 'types/users';
import api from './api';

export default class UsersService {
  static getAllUsers(): Promise<AxiosResponse<UserData[]>> {
    return api.get(ApiRoutes.users);
  }

  static getUser(userId: string): Promise<AxiosResponse<UserData>> {
    return api.get(`${ApiRoutes.users}/${userId}`);
  }

  static updateUser(userId: string, data: SignUpRequestData): Promise<AxiosResponse<UserData>> {
    return api.put(`${ApiRoutes.users}/${userId}`, data);
  }

  static deleteUser(userId: string): Promise<AxiosResponse<UserData>> {
    return api.delete(`${ApiRoutes.users}}/${userId}`);
  }
}
