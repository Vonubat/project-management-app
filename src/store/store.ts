import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import authSliceReducer from './authSlice';
import boardListSliceReducer from './boardListSlice';
import columnsReducer from './columnsSlice';
import modalSliceReducer from './modalSlice';
import notificationSliceReducer from './notificationSlice';
import tasksReducer from './tasksSlice';
import usersSliceReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    authStore: authSliceReducer,
    boardListStore: boardListSliceReducer,
    usersStore: usersSliceReducer,
    modalStore: modalSliceReducer,
    columnsStore: columnsReducer,
    tasksStore: tasksReducer,
    notificationStore: notificationSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
