import { Action, AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Status } from 'constants/constants';
import ColumnsService from 'services/columnsService';
import { ColumnData, ColumnParams } from 'types/columns';

interface RejectedAction extends Action {
  error: Error | AxiosError;
}

interface FulFilledAction extends Action {
  payload: ColumnData[] | ColumnData;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected');
}

function isPendingAction(action: AnyAction): action is Action {
  return action.type.endsWith('pending');
}

function isFulFilledAction(action: AnyAction): action is FulFilledAction {
  return action.type.endsWith('fulfilled');
}

export const getColumnsInBoards = createAsyncThunk<ColumnData[], string>(
  'columns/getAll',
  async (boardId) => {
    const res = await ColumnsService.getAllColumns(boardId);
    return res.data;
  }
);

export const createColumn = createAsyncThunk<ColumnData, { boardId: string; data: ColumnParams }>(
  'columns/create',
  async (arg) => {
    const res = await ColumnsService.createColumn(arg.boardId, arg.data);
    return res.data;
  }
);

export const updateColumn = createAsyncThunk<
  ColumnData,
  { boardId: string; columnId: string; data: ColumnParams }
>('columns/update', async (arg) => {
  const res = await ColumnsService.updateColumn(arg.boardId, arg.columnId, arg.data);
  return res.data;
});

export const deleteColumn = createAsyncThunk<ColumnData, { boardId: string; columnId: string }>(
  'columns/delete',
  async (arg) => {
    const res = await ColumnsService.deleteColumn(arg.boardId, arg.columnId);
    return res.data;
  }
);

interface IInitState {
  columns: ColumnData[];
  columnLoadingArr: ColumnData['_id'][];
  status: Status;
  error: string | null | undefined;
  currentColumnId: string;
}

const initState: IInitState = {
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

    builder.addMatcher(isRejectedAction, (state, action) => {
      state.error = action.error.message || 'Some error occurred';
      state.status = Status.failed;
    });

    builder.addMatcher(isFulFilledAction, (state) => {
      state.error = null;
      state.status = Status.succeeded;
    });
  },
});

export default columnsSlice.reducer;

export const { setCurrentColumnId, setColumnLoading } = columnsSlice.actions;

export const columnsSelector = (state: { columnsStore: IInitState }) => state.columnsStore;
