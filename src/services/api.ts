import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL, TOKEN } from 'constants/constants';
import { parseJwt } from 'utils/parseJwt';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN);
  const userData = parseJwt(token || '');

  return {
    ...config,
    headers: {
      Authorization: `Bearer ${token}`,
      initUser: userData?.id,
    },
  };
});

export default api;
