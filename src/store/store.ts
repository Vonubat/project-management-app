import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSliceReducer from './authSlice';
import boardListSliceReducer from './boardListSlice';
import userSliceReducer from './userSlice';
import modalSliceReducer from './modalSlice';
import notificationSliceReducer from './notificationSlice';

export const store = configureStore({
  reducer: {
    authStore: authSliceReducer,
    boardListStore: boardListSliceReducer,
    userStore: userSliceReducer,
    modalStore: modalSliceReducer,
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
