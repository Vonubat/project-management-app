import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import ColumnsService from 'services/columnsService';
import { ColumnData, DndColumnData } from 'types/columns';
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

export const updateColumn = createAsyncThunk<ColumnData, string, AsyncThunkConfig>(
  'columns/update',
  async (title, { getState, rejectWithValue, dispatch }) => {
    const { currentBoardId } = getState().boardListStore;
    const { currentColumnId } = getState().columnsStore;

    try {
      const currentColumn = getState().columnsStore.columns.find((c) => c._id === currentColumnId);
      if (!currentColumn) throw new Error('COLUMN ID IS NOT DEFINED'); // TODO HANDLE THIS CASE

      const res = await ColumnsService.updateColumn(currentBoardId, currentColumnId, {
        title,
        order: currentColumn.order,
      });

      return res.data;
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        throw err;
      }

      dispatch(getColumnsInBoards(currentBoardId));

      return rejectWithValue(error.response.status);
    }
  }
);

//TODO check if we can use currentColumnId
export const deleteColumn = createAsyncThunk<ColumnData, string, AsyncThunkConfig>(
  'columns/delete',
  async (columnId, { rejectWithValue, getState, dispatch }) => {
    const { currentBoardId } = getState().boardListStore;
    try {
      const res = await ColumnsService.deleteColumn(currentBoardId, columnId);

      return res.data;
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        throw err;
      }

      dispatch(getColumnsInBoards(currentBoardId));

      return rejectWithValue(error.response.status);
    }
  }
);

export const changeColumnOrder = createAsyncThunk<void, void, AsyncThunkConfig>(
  'columns/changeOrder',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const boardId = getState().boardListStore.currentBoardId;
    const columnSetData = getState().columnsStore.columns.map(({ _id, order }) => ({ _id, order }));

    if (!columnSetData.length) return;

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
  currentColumnId: string;
  columnsTitleActive: { [index: ColumnData['_id']]: boolean };
}

const initState: ColumnsState = {
  columns: [],
  currentColumnId: '',
  columnsTitleActive: {},
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState: initState,
  reducers: {
    setCurrentColumnId: (state, action: PayloadAction<string>) => {
      state.currentColumnId = action.payload;
    },
    changeLocalColumnOrder: (state, { payload }: PayloadAction<DndColumnData>) => {
      const { dragOrder, dropOrder } = payload;

      moveItem(state.columns, dragOrder, dropOrder);
      state.columns = state.columns.map((c, order) => ({ ...c, order }));
    },
    updateLocalColumn: (state, { payload }: PayloadAction<string>) => {
      const updateIndex = state.columns.findIndex((c) => c._id === state.currentColumnId);
      state.columns[updateIndex] = { ...state.columns[updateIndex], title: payload };
    },
    //TODO check can we use currentColumnId
    deleteLocalColumn: (state, { payload }: PayloadAction<string>) => {
      state.columns = state.columns
        .filter((c) => c._id !== payload)
        .map((c, order) => ({ ...c, order }));
    },
    clearLocalColumns: (state) => {
      state.columns = [];
    },
    openColumnTitle: (state, { payload }: PayloadAction<ColumnData['_id']>) => {
      state.columnsTitleActive[payload] = true;
    },
    closeColumnTitle: (state, { payload }: PayloadAction<ColumnData['_id']>) => {
      state.columnsTitleActive[payload] = false;
    },
    resetColumnTitles: (state, { payload }: PayloadAction<ColumnData['_id']>) => {
      for (const columnTitle in state.columnsTitleActive) {
        if (columnTitle !== payload) {
          state.columnsTitleActive[columnTitle] = false;
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getColumnsInBoards.fulfilled, (state, { payload }) => {
      state.columns = payload.sort(sortOrder);
    });

    builder.addCase(createColumn.fulfilled, (state, { payload }) => {
      state.columns.push(payload);
    });
  },
});

export default columnsSlice.reducer;

export const {
  setCurrentColumnId,
  changeLocalColumnOrder,
  updateLocalColumn,
  deleteLocalColumn,
  clearLocalColumns,
  openColumnTitle,
  closeColumnTitle,
  resetColumnTitles,
} = columnsSlice.actions;

export const columnsSelector = (state: { columnsStore: ColumnsState }) => state.columnsStore;
