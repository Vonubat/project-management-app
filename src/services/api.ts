import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL, TOKEN } from 'constants/constants';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config: AxiosRequestConfig) => ({
  ...config,
  headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
}));

export default api;
