import { AnyAction } from '@reduxjs/toolkit';
import { FulFilledAction, PendingAction, RejectedAction } from 'types/store';

export function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected');
}

export function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('pending');
}

export function isFulfilledAction(action: AnyAction): action is FulFilledAction {
  return action.type.endsWith('fulfilled');
}
