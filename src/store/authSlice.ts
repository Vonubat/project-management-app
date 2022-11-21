import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { StatusCode, TOKEN } from 'constants/constants';
import { AuthService } from 'services/authService';
import {
  AuthState,
  SignInOkResponseData,
  SignInRequestData,
  SignUpOkResponseData,
  SignUpRequestData,
} from 'types/auth';
import { AsyncThunkConfig } from 'types/store';
import { isFulfilledAction, isPendingAction, isRejectedAction } from 'utils/actionTypePredicates';
import { getAuthSliceInitialState } from 'utils/getAuthSliceInitialState';
import { parseJwt } from 'utils/parseJwt';

export const signUp = createAsyncThunk<SignUpOkResponseData, SignUpRequestData, AsyncThunkConfig>(
  'auth/signUp',
  async (signUpData, { rejectWithValue }) => {
    try {
      const res = await AuthService.sighUp(signUpData);

      return res.data;
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.status);
    }
  }
);

export const signIn = createAsyncThunk<SignInOkResponseData, SignInRequestData, AsyncThunkConfig>(
  'auth/signIn',
  async (signInData, { rejectWithValue }) => {
    try {
      const res = await AuthService.sighIn(signInData);

      return res.data;
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.status);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: getAuthSliceInitialState(),
  reducers: {
    clearAuthPageData: (state) => {
      state.created = null;
    },
    logOut: (state) => {
      state.isAuth = false;
      state.login = '';
      state.name = '';
      state.userId = '';
      localStorage.removeItem(TOKEN);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      const { login, name } = payload;
      state.created = { login, name };
    });

    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      const jwtBody = parseJwt(payload.token);

      if (jwtBody) {
        state.login = jwtBody.login;
        state.isAuth = true;
        state.userId = jwtBody.id;

        localStorage.setItem(TOKEN, payload.token);
      }
    });

    builder.addMatcher(isRejectedAction, (state, action) => {
      if (action.payload && action.payload === StatusCode.unauthorized) {
        state.isAuth = false;
        localStorage.removeItem(TOKEN);
      }
    });
  },
});

export default authSlice.reducer;

export const { clearAuthPageData, logOut } = authSlice.actions;

export const authSelector = (state: { authStore: AuthState }) => state.authStore;
