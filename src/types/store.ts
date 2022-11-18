import { Status } from 'constants/constants';
import { Action } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from 'store/store';
import { SignInOkResponseData, SignUpOkResponseData } from './auth';
import { TaskData } from './tasks';
import { ColumnData } from './columns';
import { BoardData } from './boards';

export type StatusType = Status.idle | Status.pending | Status.succeeded | Status.failed;

export interface RejectedAction extends Action {
  error: Error | AxiosError;
  payload?: number;
}

export interface FulFilledAction extends Action {
  payload:
    | SignUpOkResponseData
    | SignInOkResponseData
    | TaskData[]
    | TaskData
    | ColumnData[]
    | ColumnData
    | BoardData
    | BoardData[];
}

export type PendingAction = Action;

export type AsyncThunkConfig = {
  state: RootState;
  rejectValue: number;
};
