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

export const getTasksByBoardId = createAsyncThunk<TaskData[], string, AsyncThunkConfig>(
  'tasks/getByBoardId',
  async (boardId: string) => {
    const res = await TasksService.getTaskSetByBoardId(boardId);
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

    dispatch(getTasksByBoardId(boardId));

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

      dispatch(getTasksByBoardId(boardId));

      return rejectWithValue(error.response.status);
    }
  }
);

export const changeTaskOrder = createAsyncThunk<void, void, AsyncThunkConfig>(
  'tasks/changeOrder',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const { currentBoardId } = getState().boardListStore;
    const tasks = Object.values(getState().tasksStore.tasks).flat();

    const data = tasks.map(({ _id, order, columnId }) => ({ _id, order, columnId }));

    if (!data.length) return;

    try {
      await TasksService.updateTaskSet(data);
    } catch (err) {
      const error = err as AxiosError;

      if (!error.response) {
        throw err;
      }

      dispatch(getTasksByBoardId(currentBoardId));

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

        state.tasks[dragColumnId] = state.tasks[dragColumnId].map((t, order) => ({ ...t, order }));
      } else {
        const [dragTask] = state.tasks[dragColumnId].splice(dragOrder, 1);

        if (state.tasks[dragColumnId].length) {
          state.tasks[dragColumnId] = state.tasks[dragColumnId].map((t, order) => ({
            ...t,
            order,
          }));
        } else {
          delete state.tasks[dragColumnId];
        }

        if (state.tasks[dropColumnId]) {
          state.tasks[dropColumnId].splice(dropOrder, 0, { ...dragTask, columnId: dropColumnId });
          state.tasks[dropColumnId] = state.tasks[dropColumnId].map((t, order) => ({
            ...t,
            order,
          }));
        } else {
          state.tasks[dropColumnId] = [{ ...dragTask, columnId: dropColumnId, order: 0 }];
        }
      }
    },
    updateLocalTask: (state, { payload }: PayloadAction<UpdateLocalTaskParam>) => {
      const { columnId, order } = state.currentTask;
      state.tasks[columnId][order] = { ...state.currentTask, ...payload.data };
    },
    deleteLocalTask: (state) => {
      const { columnId, order: currentTaskOrder } = state.currentTask;
      state.tasks[columnId].splice(currentTaskOrder, 1);
      state.tasks[columnId] = state.tasks[columnId].map((t, order) => ({ ...t, order }));
    },
    deleteLocalTaskById: (state, { payload: taskId }: PayloadAction<string>) => {
      const task = Object.values(state.tasks)
        .flat()
        .find((t) => t._id === taskId);

      if (task) {
        state.tasks[task.columnId].splice(task.order, 1);

        if (state.tasks[task.columnId].length) {
          state.tasks[task.columnId] = state.tasks[task.columnId].map((t, order) => ({
            ...t,
            order,
          }));
        } else {
          delete state.tasks[task.columnId];
        }
      }
    },
    clearAllLocalTasks: (state) => {
      state.tasks = {};
    },
    clearLocalTaskByColumnId: (state, { payload }: PayloadAction<string>) => {
      delete state.tasks[payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasksByBoardId.fulfilled, (state, { payload: taskList }) => {
      state.tasks = {};
      const columnsIds = taskList.reduce((acc, task) => acc.add(task.columnId), new Set<string>());

      columnsIds.forEach(
        (columnId) =>
          (state.tasks[columnId] = [
            ...taskList.filter((t) => t.columnId === columnId).sort(sortOrder),
          ])
      );
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
  deleteLocalTaskById,
} = tasksSlice.actions;

export const tasksSelector = (state: { tasksStore: TasksState }) => state.tasksStore;
