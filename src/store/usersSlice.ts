import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import UsersService from 'services/usersService';
import { SignUpOkResponseData, SignUpRequestData } from 'types/auth';
import { AsyncThunkConfig } from 'types/store';
import { UserData } from 'types/users';

type UsersState = {
  name: string;
  login: string;
  userId: string;
  usersLoading: boolean;
  users: UserData[];
};

export const getUser = createAsyncThunk<SignUpOkResponseData, void, AsyncThunkConfig>(
  'users/getUser',
  async (_, { getState, rejectWithValue }) => {
    const { userId } = getState().authStore;

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
  }
);

export const updateUser = createAsyncThunk<
  SignUpOkResponseData,
  SignUpRequestData,
  AsyncThunkConfig
>('users/update', async (data, { getState, rejectWithValue }) => {
  const { userId } = getState().usersStore;

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

export const deleteUser = createAsyncThunk<SignUpOkResponseData, void, AsyncThunkConfig>(
  'users/delete',
  async (_, { getState, rejectWithValue }) => {
    const { userId } = getState().usersStore;

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
  }
);

export const getAllUsers = createAsyncThunk<UserData[], void, AsyncThunkConfig>(
  'users/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await UsersService.getAllUsers();
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

const userSliceInitialState: UsersState = {
  name: '',
  login: '',
  userId: '',
  usersLoading: false,
  users: [],
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

    builder.addCase(getAllUsers.pending, (state) => {
      state.usersLoading = true;
    });

    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.usersLoading = false;
    });
  },
});

export default usersSlice.reducer;

export const usersSelector = (state: { usersStore: UsersState }) => state.usersStore;
