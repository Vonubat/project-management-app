import { grey } from '@mui/material/colors';

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
  points = '/points',
}

export const _ = undefined; // for skipping unnecessary fn params

export const TOKEN = 'token';

export enum LangType {
  ru = 'ru',
  en = 'en',
}

// Colors
export const GRAY_700: '#616161' = grey[700];

// MediaQuery storage

export const MediaQuery = {
  750: '(min-width:750px)',
  500: '(min-width:500px)',
};
