import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Status } from 'constants/constants';
import TasksService from 'services/tasksService';
import { ColumnData } from 'types/columns';
import { AsyncThunkConfig, AsyncThunkWithMeta } from 'types/store';
import {
  CreateTaskParams,
  CurrentTaskInfo,
  TaskData,
  TaskParamsUpdate,
  UpdateTaskParams,
} from 'types/tasks';
import { isFulfilledAction, isPendingAction, isRejectedAction } from 'utils/actionTypePredicates';

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
    const order = taskList.length + 1;
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
>('tasks/update', async ({ taskId, data }, { getState, rejectWithValue }) => {
  const { currentBoardId } = getState().boardListStore;
  const { currentColumnId: columnId } = getState().columnsStore;
  const { userId } = getState().authStore;
  const order = getState().tasksStore.tasks[columnId].find((t) => t._id === taskId)?.order;
  const params = { ...data, userId, order: order || 1, columnId };

  try {
    const res = await TasksService.updateTask(currentBoardId, columnId, taskId, params);

    return res.data;
  } catch (err) {
    const error = err as AxiosError;

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.status);
  }
});

export const deleteTask = createAsyncThunk<
  TaskData,
  { columnId: string; taskId: string },
  AsyncThunkConfig
>('tasks/delete', async ({ columnId, taskId }, { getState, rejectWithValue }) => {
  const { currentBoardId } = getState().boardListStore;
  try {
    const res = await TasksService.deleteTask(currentBoardId, columnId, taskId);

    return res.data;
  } catch (err) {
    const error = err as AxiosError;

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.status);
  }
});

export const changeTaskOrder = createAsyncThunk<
  ColumnData,
  { id: string; boardId: string; oldColumnId: string; newColumnId: string; order: number },
  AsyncThunkConfig
>(
  'tasks/changeOrder',
  async ({ id, boardId, oldColumnId, newColumnId, order }, { getState, rejectWithValue }) => {
    const { tasks } = getState().tasksStore;
    const taskData = tasks[oldColumnId].find((t) => t._id === id) as TaskData;

    const task = { ...taskData } as Partial<TaskData>;
    delete task._id;
    delete task.boardId;

    try {
      const res = await TasksService.updateTask(boardId, oldColumnId, id, {
        ...(task as TaskParamsUpdate),
        order,
        columnId: newColumnId,
      });

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

interface IInitState {
  tasks: { [index: TaskData['columnId']]: TaskData[] };
  tasksLoadingArr: ColumnData['_id'][];
  status: Status;
  error: string | null | undefined;
  currentTaskInfo: CurrentTaskInfo;
}

const initState: IInitState = {
  tasks: {},
  tasksLoadingArr: [],
  status: Status.idle,
  error: null,
  currentTaskInfo: { currentTaskId: '', currentTaskTitle: '', currentTaskDescription: '' },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initState,
  reducers: {
    setCurrentTaskInfo: (state, action: PayloadAction<CurrentTaskInfo>) => {
      state.currentTaskInfo = action.payload;
    },
    setTasksLoading: (state, action: PayloadAction<ColumnData['_id']>) => {
      state.tasksLoadingArr.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.fulfilled, (state, { payload, meta }) => {
      state.tasks[meta.arg] = payload;
    });

    builder.addCase(createTask.fulfilled, (state, { payload, meta }) => {
      state.tasks[meta['0']].push(payload);
      state.tasksLoadingArr = state.tasksLoadingArr.filter(
        (columnId) => payload.columnId !== columnId
      );
    });

    builder.addCase(updateTask.fulfilled, (state, { payload }) => {
      state.tasks[payload.columnId] = state.tasks[payload.columnId].map((task) =>
        task._id === payload._id ? payload : task
      );
      state.tasksLoadingArr = state.tasksLoadingArr.filter(
        (columnId) => payload.columnId !== columnId
      );
    });

    builder.addCase(deleteTask.fulfilled, (state, { payload, meta }) => {
      state.tasks[meta.arg.columnId] = state.tasks[meta.arg.columnId].filter(
        (task) => task._id !== payload._id
      );
      state.tasksLoadingArr = state.tasksLoadingArr.filter(
        (columnId) => payload.columnId !== columnId
      );
    });

    builder.addMatcher(isPendingAction, (state) => {
      state.status = Status.pending;
    });

    builder.addMatcher(isRejectedAction, (state) => {
      state.status = Status.failed;
    });

    builder.addMatcher(isFulfilledAction, (state) => {
      state.status = Status.succeeded;
    });
  },
});

export default tasksSlice.reducer;

export const { setCurrentTaskInfo, setTasksLoading } = tasksSlice.actions;

export const tasksSelector = (state: { tasksStore: IInitState }) => state.tasksStore;
