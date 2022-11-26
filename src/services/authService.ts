import { AxiosResponse } from 'axios';
import { ApiRoutes } from 'constants/constants';
import {
  SignInOkResponseData,
  SignInRequestData,
  SignUpOkResponseData,
  SignUpRequestData,
} from 'types/auth';

import api from './api';

export class AuthService {
  static sighUp(data: SignUpRequestData): Promise<AxiosResponse<SignUpOkResponseData>> {
    return api.post(ApiRoutes.sighUp, data);
  }

  static sighIn(data: SignInRequestData): Promise<AxiosResponse<SignInOkResponseData>> {
    return api.post(ApiRoutes.signIn, data);
  }
}
