import { Action, AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { TOKEN } from 'constants/constants';
import { AuthService } from 'services/authService';
import {
  SignInOkResponseData,
  SignInRequestData,
  SignUpOkResponseData,
  SignUpRequestData,
} from 'types/auth';
import { parseJwt } from 'utils/parseJwt';

interface RejectedAction extends Action {
  error: Error | AxiosError;
}

type PendingAction = Action;

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected');
}

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('pending');
}

type AuthState = {
  isLoading: boolean;
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
  isLoading: false,
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
    clearAuthPageData: (state) => {
      state.error = null;
      state.created = null;
      state.isLoading = false;
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
      state.isLoading = false;
    });

    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      const jwtBody = parseJwt(payload.token);

      if (jwtBody) {
        state.login = jwtBody && jwtBody.login;
        state.isAuth = true;
        state.isLoading = false;

        localStorage.setItem(TOKEN, payload.token);

        return;
      }

      console.log('invalid jwt'); // TODO handle this case
    });

    builder.addMatcher(isPendingAction, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addMatcher(isRejectedAction, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Some error occoured';
    });
  },
});

export default authSlice.reducer;

export const { clearAuthPageData, clearAuthError, logOut } = authSlice.actions;

export const authSelector = (state: { authStore: AuthState }) => state.authStore;
