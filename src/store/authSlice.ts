import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOKEN } from 'constants/constants';
import { AuthService } from 'services/authService';
import {
  SignInOkResponseData,
  SignInRequestData,
  SignUpOkResponseData,
  SignUpRequestData,
} from 'types/auth';
import { parseJwt } from 'utils/parseJwt';

type AuthState = {
  isAuth: boolean;
  name: string | null;
  login: string | null;
  created: {
    name: string;
    login: string;
  } | null;
  error: string | null;
};

const authInitialState: AuthState = {
  isAuth: false,
  name: null,
  login: null,
  created: null,
  error: null,
};

export const signUp = createAsyncThunk<SignUpOkResponseData, SignUpRequestData>(
  'auth/signUp',
  async (signUpData) => {
    const res = await AuthService.sighUp(signUpData);

    return res.data;
  }
);

export const signIn = createAsyncThunk<SignInOkResponseData, SignInRequestData>(
  'auth/signIn',
  async (signInData) => {
    const res = await AuthService.sighIn(signInData);

    return res.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    removeCreated: (state) => {
      state.created = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    logOut: (state) => {
      state.isAuth = false;
      localStorage.removeItem(TOKEN);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      const { login, name } = payload;
      state.created = { login, name };
    });

    builder.addCase(signUp.rejected, (state, action) => {
      state.error = action.error.message || 'Some error occoured';
    });

    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      const jwtBody = parseJwt(payload.token);

      if (jwtBody) {
        state.login = jwtBody && jwtBody.login;
        state.isAuth = true;

        localStorage.setItem(TOKEN, payload.token);

        return;
      }

      console.log('invalid jwt'); // TODO handle this case
    });

    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.error.message || 'Some error occoured';
    });
  },
});

export default authSlice.reducer;

export const { removeCreated, clearAuthError, logOut } = authSlice.actions;

export const authSelector = (state: { authStore: AuthState }) => state.authStore;
