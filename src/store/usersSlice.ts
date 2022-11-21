import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import UsersService from 'services/usersService';
import { SignUpOkResponseData, SignUpRequestData } from 'types/auth';
import { AsyncThunkConfig } from 'types/store';

type UsersState = {
  name: string;
  login: string;
  userId: string;
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

const userSliceInitialState: UsersState = {
  name: '',
  login: '',
  userId: '',
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
  },
});

export default usersSlice.reducer;

export const usersSelector = (state: { usersStore: UsersState }) => state.usersStore;
