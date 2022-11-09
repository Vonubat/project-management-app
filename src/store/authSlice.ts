import { Action, AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { TOKEN } from 'constants/constants';
import { AuthService } from 'services/authService';
import {
  AuthState,
  SignInOkResponseData,
  SignInRequestData,
  SignUpOkResponseData,
  SignUpRequestData,
} from 'types/auth';
import { getAuthSliseInitialState } from 'utils/getAuthSliceInitialState';
import { parseJwt } from 'utils/parseJwt';

interface RejectedAction extends Action {
  error: Error | AxiosError;
}

type PendingAction = Action;

interface FulFilledActiion extends Action {
  payload: SignUpOkResponseData | SignInOkResponseData;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected');
}

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('pending');
}

function isFullfiledAction(action: AnyAction): action is FulFilledActiion {
  return action.type.endsWith('fulfilled');
}

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
  initialState: getAuthSliseInitialState(),
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
    });

    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      const jwtBody = parseJwt(payload.token);

      if (jwtBody) {
        state.login = jwtBody.login;
        state.isAuth = true;
        state.userId = jwtBody.id;

        localStorage.setItem(TOKEN, payload.token);

        return;
      }

      state.error = 'invalid jwt';
    });

    builder.addMatcher(isPendingAction, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addMatcher(isRejectedAction, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Some error occoured';
    });

    builder.addMatcher(isFullfiledAction, (state) => {
      state.error = null;
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;

export const { clearAuthPageData, clearAuthError, logOut } = authSlice.actions;

export const authSelector = (state: { authStore: AuthState }) => state.authStore;
