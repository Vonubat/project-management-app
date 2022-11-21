import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Status } from 'constants/constants';
import ColumnsService from 'services/columnsService';
import { ColumnData, ColumnParams, DndColumnData } from 'types/columns';
import { AsyncThunkConfig } from 'types/store';
import { moveItem } from 'utils/moveItem';
import { sortOrder } from 'utils/sortByOrder';

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

export const createColumn = createAsyncThunk<ColumnData, { title: string }, AsyncThunkConfig>(
  'columns/create',
  async (data, { getState, rejectWithValue }) => {
    const { currentBoardId } = getState().boardListStore;
    const { columns } = getState().columnsStore;

    const order = columns.length
      ? columns.reduce((prev, current) => (prev.order < current.order ? current : prev)).order + 1
      : 0;

    try {
      const res = await ColumnsService.createColumn(currentBoardId, { ...data, order });

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

export const updateColumn = createAsyncThunk<ColumnData, ColumnParams, AsyncThunkConfig>(
  'columns/update',
  async (data, { getState, rejectWithValue }) => {
    const { currentBoardId } = getState().boardListStore;
    const { currentColumnId } = getState().columnsStore;

    try {
      const res = await ColumnsService.updateColumn(currentBoardId, currentColumnId, data);

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

export const deleteColumn = createAsyncThunk<ColumnData, string, AsyncThunkConfig>(
  'columns/delete',
  async (columnId, { rejectWithValue, getState }) => {
    const { currentBoardId } = getState().boardListStore;
    try {
      const res = await ColumnsService.deleteColumn(currentBoardId, columnId);

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

export const changeColumnOrder = createAsyncThunk<void, void, AsyncThunkConfig>(
  'columns/changeOrder',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const boardId = getState().boardListStore.currentBoardId;
    const columnSetData = getState().columnsStore.columns.map((c) => ({
      _id: c._id,
      order: c.order,
    }));

    try {
      await ColumnsService.updateColumnsSet(columnSetData);
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        throw err;
      }

      dispatch(getColumnsInBoards(boardId));

      return rejectWithValue(error.response.status);
    }
  }
);

interface ColumnsState {
  columns: ColumnData[];
  columnLoadingArr: ColumnData['_id'][];
  status: Status;
  currentColumnId: string;
}

const initState: ColumnsState = {
  columns: [],
  columnLoadingArr: [],
  status: Status.idle,
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
    changeLocalColumnOrder: (state, { payload }: PayloadAction<DndColumnData>) => {
      const { dragOrder, dropOrder } = payload;

      moveItem(state.columns, dragOrder, dropOrder);
      state.columns = state.columns.map((c, index) => ({ ...c, order: index }));
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getColumnsInBoards.fulfilled, (state, { payload }) => {
      state.columns = payload.sort(sortOrder);
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
  },
});

export default columnsSlice.reducer;

export const { setCurrentColumnId, setColumnLoading, changeLocalColumnOrder } =
  columnsSlice.actions;

export const columnsSelector = (state: { columnsStore: ColumnsState }) => state.columnsStore;
