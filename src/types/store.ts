import { Status } from 'constants/constants';
import { Action } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export type StatusType = Status.idle | Status.pending | Status.succeeded | Status.failed;

export interface RejectedAction extends Action {
  error: Error | AxiosError;
  payload?: number;
}

export type PendingAction = Action;
