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

export const LANG_TYPE = 'langType';

export enum LangType {
  ru = 'ru',
  en = 'en',
}

export enum Status {
  idle = 'idle',
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

// Colors
export const GRAY_700: '#616161' = grey[700];

// MediaQuery storage

export enum MediaQuery {
  'min-width-750' = '(min-width:750px)',
  'min-width-715' = '(min-width:715px)',
  'min-width-500' = '(min-width:500px)',
  'min-width-380' = '(min-width:380px)',
}
