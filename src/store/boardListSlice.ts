import { Action, AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import BoardsService from 'services/boardsService';
import { BoardData, BoardParams } from 'types/boards';

interface RejectedAction extends Action {
  error: Error | AxiosError;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected');
}

function isPendingAction(action: AnyAction) {
  return action.type.endsWith('pending');
}

function isFulFilledAction(action: AnyAction) {
  return action.type.endsWith('fulfilled');
}

export const getBoardsByUser = createAsyncThunk<BoardData[], string>(
  'board/getAll',
  async (userId) => {
    const res = await BoardsService.getUserBoardsSet(userId);
    return res.data;
  }
);

export const createBoard = createAsyncThunk<BoardData, BoardParams>(
  'board/create',
  async (createBoardData) => {
    const res = await BoardsService.createBoard(createBoardData);
    return res.data;
  }
);

export const editBoard = createAsyncThunk<BoardData, Parameters<typeof BoardsService.updateBoard>>(
  'board/edit',
  async (params) => {
    const res = await BoardsService.updateBoard(...params);
    return res.data;
  }
);

export const deleteBoard = createAsyncThunk<BoardData, string>('board/delete', async (boardId) => {
  const res = await BoardsService.deleteBoard(boardId);
  return res.data;
});

interface IInitState {
  boards: BoardData[];
  error: string | undefined;
  isLoading: boolean;
}

const initState: IInitState = {
  boards: [],
  error: undefined,
  isLoading: false,
};

const boardListSlice = createSlice({
  name: 'board',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoardsByUser.fulfilled, (state, { payload }) => {
      state.boards = payload;
    });

    builder.addCase(createBoard.fulfilled, (state, { payload }) => {
      state.boards.push(payload);
    });

    builder.addCase(editBoard.fulfilled, (state, { payload }) => {
      state.boards = state.boards.map((board) => (board._id === payload._id ? payload : board));
    });

    builder.addCase(deleteBoard.fulfilled, (state, { payload }) => {
      state.boards = state.boards.filter((board) => board._id !== payload._id);
    });

    builder.addMatcher(isPendingAction, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });

    builder.addMatcher(isRejectedAction, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Some error occurred';
    });

    builder.addMatcher(isFulFilledAction, (state) => {
      state.error = undefined;
      state.isLoading = false;
    });
  },
});

export default boardListSlice.reducer;

export const boardListSelector = (state: { boardListStore: IInitState }) => state.boardListStore;
