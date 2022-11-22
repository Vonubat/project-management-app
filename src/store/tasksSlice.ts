import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { EMPTY_TASK } from 'constants/constants';
import TasksService from 'services/tasksService';
import { ColumnData } from 'types/columns';
import { AsyncThunkConfig, AsyncThunkWithMeta } from 'types/store';
import {
  CreateTaskParams,
  DndTaskData,
  TaskData,
  UpdateLocalTaskParam,
  UpdateTaskParams,
} from 'types/tasks';
import { moveItem } from 'utils/moveItem';
import { sortOrder } from 'utils/sortByOrder';

export const getAllTasks = createAsyncThunk<TaskData[], string, AsyncThunkConfig>(
  'tasks/getAll',
  async (columnId, { getState }) => {
    const { currentBoardId } = getState().boardListStore;

    const res = await TasksService.getAllTasks(currentBoardId, columnId);
    return res.data;
  }
);

export const createTask = createAsyncThunk<TaskData, CreateTaskParams, AsyncThunkWithMeta>(
  'tasks/create',
  async (data, { getState, rejectWithValue, fulfillWithValue }) => {
    const { currentBoardId } = getState().boardListStore;
    const { currentColumnId: columnId } = getState().columnsStore;
    const { userId } = getState().authStore;
    const taskList = getState().tasksStore.tasks[columnId] || [];
    const order = taskList.length
      ? taskList.reduce((prev, current) => (prev.order < current.order ? current : prev)).order + 1
      : 0;

    const params = { ...data, userId, order };

    try {
      const res = await TasksService.createTask(currentBoardId, columnId, params);
      return fulfillWithValue(res.data, [columnId]);
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.status);
    }
  }
);

export const updateTask = createAsyncThunk<
  TaskData,
  { taskId: string; data: UpdateTaskParams },
  AsyncThunkConfig
>('tasks/update', async ({ taskId, data }, { getState, rejectWithValue, dispatch }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, boardId, ...rest } = Object.values(getState().tasksStore.tasks)
    .flat()
    .find((t) => t._id === taskId)!;

  try {
    const res = await TasksService.updateTask(boardId, rest.columnId, taskId, { ...rest, ...data });

    return res.data;
  } catch (err) {
    const error = err as AxiosError;

    if (!error.response) {
      throw err;
    }

    dispatch(getAllTasks(boardId));

    return rejectWithValue(error.response.status);
  }
});

export const deleteTask = createAsyncThunk<TaskData, void, AsyncThunkConfig>(
  'tasks/delete',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const { boardId, columnId, _id } = getState().tasksStore.currentTask;

    try {
      const res = await TasksService.deleteTask(boardId, columnId, _id);

      return res.data;
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        throw err;
      }

      dispatch(getAllTasks(boardId));

      return rejectWithValue(error.response.status);
    }
  }
);

export const changeTaskOrder = createAsyncThunk<void, string[], AsyncThunkConfig>(
  'tasks/changeOrder',
  async (columnsId, { getState, rejectWithValue, dispatch }) => {
    const tasks = Object.values(getState().tasksStore.tasks).flat();

    const data = tasks.map((t) => ({
      _id: t._id,
      order: t.order,
      columnId: t.columnId,
    }));

    try {
      await TasksService.updateTaskSet(data);
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        throw err;
      }

      columnsId.forEach((id) => dispatch(getAllTasks(id)));

      return rejectWithValue(error.response.status);
    }
  }
);

interface TasksState {
  tasks: { [index: TaskData['columnId']]: TaskData[] };
  tasksLoadingArr: ColumnData['_id'][];
  currentTask: TaskData;
}

const initState: TasksState = {
  tasks: {},
  tasksLoadingArr: [],
  currentTask: EMPTY_TASK,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<TaskData>) => {
      state.currentTask = action.payload;
    },
    setTasksLoading: (state, action: PayloadAction<ColumnData['_id']>) => {
      state.tasksLoadingArr.push(action.payload);
    },
    changeLocalTaskOrder: (state, { payload }: PayloadAction<DndTaskData>) => {
      const { dragOrder, dragColumnId, dropOrder, dropColumnId } = payload;

      if (dragColumnId === dropColumnId) {
        moveItem(state.tasks[dragColumnId], dragOrder, dropOrder);

        state.tasks[dragColumnId] = state.tasks[dragColumnId].map((c, order) => ({ ...c, order }));
        return;
      }

      if (dragColumnId !== dropColumnId) {
        const [dragTask] = state.tasks[dragColumnId].splice(dragOrder, 1);
        dragTask.columnId = dropColumnId;

        if (!state.tasks[dropColumnId].length) {
          state.tasks[dropColumnId].push(dragTask);
        } else {
          state.tasks[dropColumnId].splice(dropOrder, 0, dragTask);
        }

        if (state.tasks[dragColumnId].length) {
          state.tasks[dragColumnId] = state.tasks[dragColumnId]?.map((c, order) => ({
            ...c,
            order,
          }));
        }

        if (state.tasks[dropColumnId].length) {
          state.tasks[dropColumnId] = state.tasks[dropColumnId].map((c, order) => ({
            ...c,
            order,
          }));
        }
      }
    },
    updateLocalTask: (state, { payload }: PayloadAction<UpdateLocalTaskParam>) => {
      const { columnId, order } = state.currentTask;
      state.tasks[columnId][order] = { ...state.currentTask, ...payload.data };
    },
    deleteLocalTask: (state) => {
      const { columnId, order } = state.currentTask;
      state.tasks[columnId].splice(order, 1);
      state.tasks[columnId] = state.tasks[columnId].map((t, order) => ({ ...t, order }));
    },
    clearAllLocalTasks: (state) => {
      state.tasks = {};
    },
    clearLocalTaskByColumnId: (state, { payload }: PayloadAction<string>) => {
      delete state.tasks[payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.fulfilled, (state, { payload, meta }) => {
      state.tasks[meta.arg] = payload.sort(sortOrder);
    });

    builder.addCase(createTask.fulfilled, (state, { payload, meta }) => {
      if (state.tasks[meta['0']]) {
        state.tasks[meta['0']].push(payload);
      } else {
        state.tasks[meta['0']] = [payload];
      }
      state.tasksLoadingArr = state.tasksLoadingArr.filter(
        (columnId) => payload.columnId !== columnId
      );
    });
  },
});

export default tasksSlice.reducer;

export const {
  setCurrentTask,
  setTasksLoading,
  changeLocalTaskOrder,
  updateLocalTask,
  deleteLocalTask,
  clearAllLocalTasks,
  clearLocalTaskByColumnId,
} = tasksSlice.actions;

export const tasksSelector = (state: { tasksStore: TasksState }) => state.tasksStore;
