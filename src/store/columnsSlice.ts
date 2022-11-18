import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Status } from 'constants/constants';
import ColumnsService from 'services/columnsService';
import { ColumnData, ColumnParams } from 'types/columns';
import { AsyncThunkConfig } from 'types/store';
import { isFulfilledAction, isPendingAction, isRejectedAction } from 'utils/actionTypePredicates';

export const getColumnsInBoards = createAsyncThunk<ColumnData[], string, AsyncThunkConfig>(
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
  AsyncThunkConfig
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
  AsyncThunkConfig
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
  columnLoadingArr: ColumnData['_id'][];
  status: Status;
  error: string | null | undefined;
  currentColumnId: string;
}

const initState: ColumnsState = {
  columns: [],
  columnLoadingArr: [],
  status: Status.idle,
  error: null,
  currentColumnId: '',
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState: initState,
  reducers: {
    setCurrentColumnId: (state, action: PayloadAction<string>) => {
      state.currentColumnId = action.payload;
    },
    setColumnLoading: (state, action: PayloadAction<string>) => {
      state.columnLoadingArr.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getColumnsInBoards.pending, (state) => {
      state.status = Status.pending;
    });

    builder.addCase(getColumnsInBoards.fulfilled, (state, { payload }) => {
      state.columns = payload;
    });

    builder.addCase(createColumn.pending, (state) => {
      state.status = Status.pending;
    });

    builder.addCase(createColumn.fulfilled, (state, { payload }) => {
      state.columns.push(payload);
    });

    builder.addCase(updateColumn.fulfilled, (state, { payload }) => {
      state.columns = state.columns.map((column) =>
        column._id === payload._id ? payload : column
      );
      state.columnLoadingArr = state.columnLoadingArr.filter((id) => payload._id !== id);
    });

    builder.addCase(deleteColumn.fulfilled, (state, { payload }) => {
      state.columns = state.columns.filter((column) => column._id !== payload._id);
      state.columnLoadingArr = state.columnLoadingArr.filter((id) => payload._id !== id);
    });

    builder.addMatcher(isPendingAction, (state) => {
      state.error = null;
    });

    builder.addMatcher(isRejectedAction, (state) => {
      state.status = Status.failed;
    });

    builder.addMatcher(isFulfilledAction, (state) => {
      state.status = Status.succeeded;
    });
  },
});

export default columnsSlice.reducer;

export const { setCurrentColumnId, setColumnLoading } = columnsSlice.actions;

export const columnsSelector = (state: { columnsStore: ColumnsState }) => state.columnsStore;
