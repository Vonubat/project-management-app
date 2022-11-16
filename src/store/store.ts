import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSliceReducer from './authSlice';
import boardListSliceReducer from './boardListSlice';
import userSliceReducer from './userSlice';
import modalSliceReducer from './modalSlice';
import columnsReducer from './columnsSlice';
import tasksReducer from './tasksSlice';
import notificationSliceReducer from './notificationSlice';

export const store = configureStore({
  reducer: {
    authStore: authSliceReducer,
    boardListStore: boardListSliceReducer,
    userStore: userSliceReducer,
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
