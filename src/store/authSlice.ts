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
  error: Error;
  payload?: number;
}

type PendingAction = Action;

interface FulFilledAction extends Action {
  payload: SignUpOkResponseData | SignInOkResponseData;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected');
}

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('pending');
}

function isFulfilledAction(action: AnyAction): action is FulFilledAction {
  return action.type.endsWith('fulfilled');
}

export const signUp = createAsyncThunk<
  SignUpOkResponseData,
  SignUpRequestData,
  { rejectValue: number }
>('auth/signUp', async (signUpData, { rejectWithValue }) => {
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
});

export const signIn = createAsyncThunk<
  SignInOkResponseData,
  SignInRequestData,
  { rejectValue: number }
>('auth/signIn', async (signInData, { rejectWithValue }) => {
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
});

const authSlice = createSlice({
  name: 'auth',
  initialState: getAuthSliseInitialState(),
  reducers: {
    clearAuthPageData: (state) => {
      state.error = null;
      state.created = null;
      state.isLoading = false;
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
      state.isLoading = true;
    });

    builder.addMatcher(isRejectedAction, (state) => {
      state.isLoading = false;
    });

    builder.addMatcher(isFulfilledAction, (state) => {
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;

export const { clearAuthPageData, logOut } = authSlice.actions;

export const authSelector = (state: { authStore: AuthState }) => state.authStore;
