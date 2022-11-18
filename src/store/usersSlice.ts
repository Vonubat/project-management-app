import { createAsyncThunk, createSlice, Action, AnyAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import UsersService from 'services/usersService';
import { SignUpOkResponseData, SignUpRequestData } from 'types/auth';
import { RootState } from './store';

type UsersState = {
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

interface FulFilledAction extends Action {
  payload: SignUpOkResponseData;
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

export const getUser = createAsyncThunk<
  SignUpOkResponseData,
  void,
  { state: RootState; rejectValue: number }
>('users/getUser', async (_, { getState, rejectWithValue }) => {
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

export const updateUser = createAsyncThunk<
  SignUpOkResponseData,
  SignUpRequestData,
  { state: RootState; rejectValue: number }
>('users/update', async (data, { getState, rejectWithValue }) => {
  const {
    usersStore: { userId },
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
>('users/delete', async (_, { getState, rejectWithValue }) => {
  const {
    usersStore: { userId },
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

const userSliceInitialState: UsersState = {
  name: '',
  login: '',
  userId: '',
  error: null,
  isLoading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState: userSliceInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, { payload: { name, login, _id } }) => {
      state.name = name;
      state.login = login;
      state.userId = _id;
    });

    builder.addCase(updateUser.fulfilled, (state, { payload: { name, login } }) => {
      state.name = name;
      state.login = login;
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

    builder.addMatcher(isFulfilledAction, (state) => {
      state.error = null;
      state.isLoading = false;
    });
  },
});

export default usersSlice.reducer;

export const usersSelector = (state: { usersStore: UsersState }) => state.usersStore;
