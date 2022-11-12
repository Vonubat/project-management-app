import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSliceReducer from './authSlice';
import boardListSliceReducer from './boardListSlice';
import userSliceReducer from './userSlice';

export const store = configureStore({
  reducer: {
    authStore: authSliceReducer,
    boardListStore: boardListSliceReducer,
    userStore: userSliceReducer,
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
