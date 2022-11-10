export const BASE_URL = 'https://pms-app.adaptable.app'; // back-end url

// Write here your api endpoints
export enum ApiRoutes {
  sighUp = 'auth/signup',
  signIn = 'auth/signin',
  users = '/users',
  boards = '/boards',
  boardsSet = '/boardsSet',
  columns = '/columns',
  columnsSet = '/columnsSet',
  tasks = '/tasks',
  file = '/file',
}

export const TOKEN = 'token';

export enum LangType {
  ru = 'ru',
  en = 'en',
}
