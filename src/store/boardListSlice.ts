import { Action, AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import BoardsService from 'services/boardsService';
import { BoardData, BoardParams } from 'types/boards';
import { SignUpOkResponseData as UserData } from 'types/auth';
import UsersService from 'services/usersService';

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

export const getAllUsers = createAsyncThunk<UserData[]>('users/getAll', async () => {
  const res = await UsersService.getAllUsers();
  return res.data;
});

interface IInitState {
  boards: BoardData[];
  users: UserData[];
  error: string | undefined;
  isAddBoardLoading: boolean;
  boardLoadingArr: string[];
  usersLoading: boolean;
  isLoading: boolean;
}

const initState: IInitState = {
  boards: [],
  users: [],
  error: undefined,
  isAddBoardLoading: false,
  boardLoadingArr: [],
  usersLoading: false,
  isLoading: false,
};

const boardListSlice = createSlice({
  name: 'board',
  initialState: initState,
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

    builder.addCase(editBoard.fulfilled, (state, { payload }) => {
      state.boards = state.boards.map((board) => (board._id === payload._id ? payload : board));
      state.boardLoadingArr = state.boardLoadingArr.filter((id) => payload._id !== id);
    });

    builder.addCase(deleteBoard.fulfilled, (state, { payload }) => {
      state.boards = state.boards.filter((board) => board._id !== payload._id);
      state.boardLoadingArr = state.boardLoadingArr.filter((id) => payload._id !== id);
    });

    builder.addCase(getAllUsers.pending, (state) => {
      state.usersLoading = true;
    });

    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.usersLoading = false;
    });

    builder.addMatcher(isPendingAction, (state) => {
      state.error = undefined;
    });

    builder.addMatcher(isRejectedAction, (state, action) => {
      state.isLoading = false;
      state.boardLoadingArr = [];
      state.error = action.error.message || 'Some error occurred';
    });

    builder.addMatcher(isFulFilledAction, (state) => {
      state.error = undefined;
    });
  },
});

export default boardListSlice.reducer;
export const { setBoardLoading } = boardListSlice.actions;

export const boardListSelector = (state: { boardListStore: IInitState }) => state.boardListStore;
