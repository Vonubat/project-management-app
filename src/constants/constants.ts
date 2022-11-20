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
  tasksSet = '/tasksSet',
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

export enum DefaultColors {
  primary = 'primary',
  secondary = 'secondary',
  error = 'error',
  warning = 'warning',
  info = 'info',
  success = 'success',
}

// MediaQuery storage
export enum MediaQuery {
  minWidth750 = '(min-width:750px)',
  minWidth715 = '(min-width:715px)',
  minWidth500 = '(min-width:500px)',
  minWidth380 = '(min-width:380px)',
}

// Type of Modal storage
export enum TypeofModal {
  addColumn = 'addColumn',
  addTask = 'addTask',
  editTask = 'editTask',
  board = 'board',
}

export enum Severity {
  error = 'error',
  warning = 'warning',
  info = 'info',
  success = 'success',
}

export enum StatusCode {
  unauthorized = 403,
}

export enum ActionName {
  getAll = 'getAll',
  getUser = 'getUser',
  signIn = 'signIn',
  signUp = 'signUp',
  create = 'create',
  update = 'update',
  delete = 'delete',
}

export enum SliceName {
  auth = 'auth',
}
