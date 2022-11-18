import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import BoardsService from 'services/boardsService';
import { BoardData, BoardParams } from 'types/boards';
import { AsyncThunkConfig } from 'types/store';
import { isRejectedAction } from 'utils/actionTypePredicates';

export const getBoardsByUser = createAsyncThunk<BoardData[], void, AsyncThunkConfig>(
  'boards/getAll',
  async (_, { getState, rejectWithValue }) => {
    const {
      authStore: { userId },
    } = getState();

    try {
      const res = await BoardsService.getUserBoardsSet(userId);

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

export const createBoard = createAsyncThunk<BoardData, BoardParams, AsyncThunkConfig>(
  'boards/create',
  async (createBoardData, { rejectWithValue }) => {
    try {
      const res = await BoardsService.createBoard(createBoardData);

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

export const updateBoard = createAsyncThunk<
  BoardData,
  Parameters<typeof BoardsService.updateBoard>,
  AsyncThunkConfig
>('boards/update', async (params, { rejectWithValue }) => {
  try {
    const res = await BoardsService.updateBoard(...params);

    return res.data;
  } catch (err) {
    const error = err as AxiosError;

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.status);
  }
});

export const deleteBoard = createAsyncThunk<BoardData, string, AsyncThunkConfig>(
  'boards/delete',
  async (boardId, { rejectWithValue }) => {
    try {
      const res = await BoardsService.deleteBoard(boardId);

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

interface BoardsState {
  boards: BoardData[];
  isAddBoardLoading: boolean;
  boardLoadingArr: string[];
  isLoading: boolean;
}

const initialBoardsState: BoardsState = {
  boards: [],
  isAddBoardLoading: false,
  boardLoadingArr: [],
  isLoading: false,
};

const boardListSlice = createSlice({
  name: 'boards',
  initialState: initialBoardsState,
  reducers: {
    setBoardLoading: (state, action: PayloadAction<string>) => {
      state.boardLoadingArr.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardsByUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getBoardsByUser.fulfilled, (state, { payload }) => {
      state.boards = payload;
      state.isLoading = false;
    });

    builder.addCase(createBoard.pending, (state) => {
      state.isAddBoardLoading = true;
    });

    builder.addCase(createBoard.fulfilled, (state, { payload }) => {
      state.boards.push(payload);
      state.isAddBoardLoading = false;
    });

    builder.addCase(updateBoard.fulfilled, (state, { payload }) => {
      state.boards = state.boards.map((board) => (board._id === payload._id ? payload : board));
      state.boardLoadingArr = state.boardLoadingArr.filter((id) => payload._id !== id);
    });

    builder.addCase(deleteBoard.fulfilled, (state, { payload }) => {
      state.boards = state.boards.filter((board) => board._id !== payload._id);
      state.boardLoadingArr = state.boardLoadingArr.filter((id) => payload._id !== id);
    });

    builder.addMatcher(isRejectedAction, (state) => {
      state.isLoading = false;
      state.boardLoadingArr = [];
    });
  },
});

export default boardListSlice.reducer;
export const { setBoardLoading } = boardListSlice.actions;

export const boardListSelector = (state: { boardListStore: BoardsState }) => state.boardListStore;
