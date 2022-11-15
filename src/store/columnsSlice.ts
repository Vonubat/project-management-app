import { Action, AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Status } from 'constants/constants';
import ColumnsService from 'services/columnsService';
import { ColumnData, ColumnParams } from 'types/columns';
import { StatusType } from 'types/store';

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

export const deleteColumn = createAsyncThunk<ColumnData, { boardId: string; columnId: string }>(
  'columns/delete',
  async (arg) => {
    const res = await ColumnsService.deleteColumn(arg.boardId, arg.columnId);
    return res.data;
  }
);

interface IInitState {
  columns: ColumnData[];
  error: string | null | undefined;
  status: StatusType;
}

const initState: IInitState = {
  columns: [],
  error: null,
  status: Status.idle,
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColumnsInBoards.fulfilled, (state, { payload }) => {
      state.columns = payload;
    });

    builder.addCase(createColumn.fulfilled, (state, { payload }) => {
      state.columns.push(payload);
    });

    builder.addCase(deleteColumn.fulfilled, (state, { payload }) => {
      state.columns = state.columns.filter((column) => column._id !== payload._id);
    });

    builder.addMatcher(isPendingAction, (state) => {
      state.error = null;
      state.status = Status.pending;
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

export const columnsSelector = (state: { columnsStore: IInitState }) => state.columnsStore;
