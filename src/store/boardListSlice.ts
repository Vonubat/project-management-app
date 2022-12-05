import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import BoardsService from 'services/boardsService';
import { BoardData, BoardParams, BoardServiceUpdateParams } from 'types/boards';
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

export const updateBoard = createAsyncThunk<BoardData, BoardServiceUpdateParams, AsyncThunkConfig>(
  'boards/update',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const res = await BoardsService.updateBoard(...params);

      return res.data;
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        throw err;
      }

      dispatch(getBoardsByUser());

      return rejectWithValue(error.response.status);
    }
  }
);

export const deleteBoard = createAsyncThunk<BoardData, string, AsyncThunkConfig>(
  'boards/delete',
  async (boardId, { rejectWithValue, dispatch }) => {
    try {
      const res = await BoardsService.deleteBoard(boardId);

      return res.data;
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        throw err;
      }

      dispatch(getBoardsByUser());

      return rejectWithValue(error.response.status);
    }
  }
);

interface BoardsState {
  boards: BoardData[];
  isAddBoardLoading: boolean;
  boardLoadingArr: string[];
  currentBoardId: string;
}

const initialBoardsState: BoardsState = {
  boards: [],
  isAddBoardLoading: false,
  boardLoadingArr: [],
  currentBoardId: '',
};

const boardListSlice = createSlice({
  name: 'boards',
  initialState: initialBoardsState,
  reducers: {
    setBoardLoading: (state, action: PayloadAction<string>) => {
      state.boardLoadingArr.push(action.payload);
    },
    setCurrentBoard: (state, action: PayloadAction<string>) => {
      state.currentBoardId = action.payload;
    },
    updateLocalBoard: (state, { payload }: PayloadAction<BoardServiceUpdateParams>) => {
      const [boardId, data] = payload;
      const updateIndex = state.boards.findIndex((b) => b._id === boardId);
      state.boards[updateIndex] = { ...state.boards[updateIndex], ...data };
    },
    deleteLocalBoard: (state, { payload }: PayloadAction<string>) => {
      state.boards = state.boards.filter((b) => b._id !== payload);
    },
    clearBoardsState: (state) => {
      state.boards = initialBoardsState.boards;
      state.isAddBoardLoading = initialBoardsState.isAddBoardLoading;
      state.currentBoardId = initialBoardsState.currentBoardId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardsByUser.fulfilled, (state, { payload }) => {
      state.boards = payload;
    });

    builder.addCase(createBoard.pending, (state) => {
      state.isAddBoardLoading = true;
    });

    builder.addCase(createBoard.fulfilled, (state, { payload }) => {
      state.boards.push(payload);
      state.isAddBoardLoading = false;
    });

    builder.addMatcher(isRejectedAction, (state) => {
      state.boardLoadingArr = [];
    });
  },
});

export default boardListSlice.reducer;
export const {
  setBoardLoading,
  setCurrentBoard,
  updateLocalBoard,
  deleteLocalBoard,
  clearBoardsState,
} = boardListSlice.actions;

export const boardListSelector = (state: { boardListStore: BoardsState }) => state.boardListStore;
