import { createAsyncThunk, createSlice, Action, AnyAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import UsersService from 'services/usersService';
import { SignUpOkResponseData, SignUpRequestData } from 'types/auth';
import { RootState } from './store';

type UserState = {
  name: string;
  login: string;
  userId: string;
  error: null | string;
  isLoading: boolean;
};

interface RejectedAction extends Action {
  error: Error;
  payload?: number;
}

type PendingAction = Action;

interface FulFilledActiion extends Action {
  payload: SignUpOkResponseData;
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

export const getUser = createAsyncThunk<
  SignUpOkResponseData,
  void,
  { state: RootState; rejectValue: number }
>('user/getUser', async (_, { getState, rejectWithValue }) => {
  const {
    authStore: { userId },
  } = getState();

  try {
    if (userId) {
      const res = await UsersService.getUser(userId);

      return res.data;
    }

    throw new Error('error'); //TODO handle this case
  } catch (err) {
    const error = err as AxiosError;

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.status);
  }
});

export const updatePassword = createAsyncThunk<
  SignUpOkResponseData,
  SignUpRequestData,
  { state: RootState; rejectValue: number }
>('user/updateName', async (data, { getState, rejectWithValue }) => {
  const {
    userStore: { userId },
  } = getState();

  try {
    const res = await UsersService.updateUser(userId, data);

    return res.data;
  } catch (err) {
    const error = err as AxiosError;

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.status);
  }
});

export const deleteUser = createAsyncThunk<
  SignUpOkResponseData,
  void,
  { state: RootState; rejectValue: number }
>('user/updateName', async (_, { getState, rejectWithValue }) => {
  const {
    userStore: { userId },
  } = getState();

  try {
    const res = await UsersService.deleteUser(userId);

    return res.data;
  } catch (err) {
    const error = err as AxiosError;

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.status);
  }
});

const userSliceInitialState: UserState = {
  name: '',
  login: '',
  userId: '',
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: userSliceInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, { payload: { name, login, _id } }) => {
      state.name = name;
      state.login = login;
      state.userId = _id;
    });

    builder.addMatcher(isPendingAction, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addMatcher(isRejectedAction, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = `error${action.payload}`;
      } else {
        state.error = action.error.message;
      }
    });

    builder.addMatcher(isFullfiledAction, (state) => {
      state.error = null;
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;

export const userSelector = (state: { userStore: UserState }) => state.userStore;
