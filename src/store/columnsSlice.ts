import { Action, AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Status } from 'constants/constants';
import ColumnsService from 'services/columnsService';
import { ColumnData, ColumnParams } from 'types/columns';
import { PendingAction, RejectedAction, StatusType } from 'types/store';

interface FulFilledAction extends Action {
  payload: ColumnData[] | ColumnData;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected');
}

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('pending');
}

function isFulFilledAction(action: AnyAction): action is FulFilledAction {
  return action.type.endsWith('fulfilled');
}

export const getColumnsInBoards = createAsyncThunk<ColumnData[], string, { rejectValue: number }>(
  'columns/getAll',
  async (boardId, { rejectWithValue }) => {
    try {
      const res = await ColumnsService.getAllColumns(boardId);

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

export const createColumn = createAsyncThunk<
  ColumnData,
  { boardId: string; data: ColumnParams },
  { rejectValue: number }
>('columns/create', async ({ boardId, data }, { rejectWithValue }) => {
  try {
    const res = await ColumnsService.createColumn(boardId, data);

    return res.data;
  } catch (err) {
    const error = err as AxiosError;

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.status);
  }
});

export const updateColumn = createAsyncThunk<
  ColumnData,
  { boardId: string; columnId: string; data: ColumnParams },
  { rejectValue: number }
>('columns/update', async (arg, { rejectWithValue }) => {
  try {
    const res = await ColumnsService.updateColumn(arg.boardId, arg.columnId, arg.data);

    return res.data;
  } catch (err) {
    const error = err as AxiosError;

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.status);
  }
});

export const deleteColumn = createAsyncThunk<ColumnData, { boardId: string; columnId: string }>(
  'columns/delete',
  async (arg, { rejectWithValue }) => {
    try {
      const res = await ColumnsService.deleteColumn(arg.boardId, arg.columnId);

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

interface ColumnsState {
  columns: ColumnData[];
  status: StatusType;
  currentBoardId: string;
  currentColumnId: string;
}

const initState: ColumnsState = {
  columns: [],
  status: Status.idle,
  currentBoardId: '',
  currentColumnId: '',
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState: initState,
  reducers: {
    setCurrentBoardId: (state, action: PayloadAction<string>) => {
      state.currentBoardId = action.payload;
    },
    setCurrentColumnId: (state, action: PayloadAction<string>) => {
      state.currentColumnId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getColumnsInBoards.fulfilled, (state, { payload }) => {
      state.columns = payload;
    });

    builder.addCase(createColumn.fulfilled, (state, { payload }) => {
      state.columns.push(payload);
    });

    builder.addCase(updateColumn.fulfilled, (state, { payload }) => {
      state.columns = state.columns.map((column) =>
        column._id === payload._id ? payload : column
      );
    });

    builder.addCase(deleteColumn.fulfilled, (state, { payload }) => {
      state.columns = state.columns.filter((column) => column._id !== payload._id);
    });

    builder.addMatcher(isPendingAction, (state) => {
      state.status = Status.pending;
    });

    builder.addMatcher(isRejectedAction, (state) => {
      state.status = Status.failed;
    });

    builder.addMatcher(isFulFilledAction, (state) => {
      state.status = Status.succeeded;
    });
  },
});

export default columnsSlice.reducer;

export const { setCurrentBoardId, setCurrentColumnId } = columnsSlice.actions;

export const columnsSelector = (state: { columnsStore: ColumnsState }) => state.columnsStore;
