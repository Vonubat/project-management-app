import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Status } from 'constants/constants';
import TasksService from 'services/tasksService';
import { ColumnData } from 'types/columns';
import { AsyncThunkConfig, AsyncThunkWithMeta } from 'types/store';
import { CreateTaskParams, TaskData, UpdateTaskParams } from 'types/tasks';
import { isFulfilledAction, isPendingAction, isRejectedAction } from 'utils/actionTypePredicates';

export const getAllTasks = createAsyncThunk<TaskData[], string, AsyncThunkConfig>(
  'tasks/getAll',
  async (columnId, { getState }) => {
    const { currentBoard } = getState().boardListStore;

    const res = await TasksService.getAllTasks(currentBoard, columnId);
    return res.data;
  }
);

export const createTask = createAsyncThunk<TaskData, CreateTaskParams, AsyncThunkWithMeta>(
  'tasks/create',
  async (data, { getState, rejectWithValue, fulfillWithValue }) => {
    const { currentBoard } = getState().boardListStore;
    const { currentColumnId: columnId } = getState().columnsStore;
    const { userId } = getState().authStore;
    const taskList = getState().tasksStore.tasks[columnId] || [];
    const order = taskList.length + 1;
    const params = { ...data, userId, order };

    try {
      const res = await TasksService.createTask(currentBoard, columnId, params);
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
  const { currentBoard } = getState().boardListStore;
  const { currentColumnId: columnId } = getState().columnsStore;
  const { userId } = getState().authStore;
  const order = getState().tasksStore.tasks[columnId].find((t) => t._id === taskId)?.order;
  const params = { ...data, userId, order: order || 1, columnId };

  try {
    const res = await TasksService.updateTask(currentBoard, columnId, taskId, params);

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
  const { currentBoard } = getState().boardListStore;
  try {
    const res = await TasksService.deleteTask(currentBoard, columnId, taskId);

    return res.data;
  } catch (err) {
    const error = err as AxiosError;

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.status);
  }
});

interface IInitState {
  tasks: { [index: TaskData['columnId']]: TaskData[] };
  tasksLoadingArr: ColumnData['_id'][];
  status: Status;
  error: string | null | undefined;
  currentTaskTitle: string;
  currentTaskDescription: string;
  currentTaskId: string;
}

const initState: IInitState = {
  tasks: {},
  tasksLoadingArr: [],
  status: Status.idle,
  error: null,
  currentTaskTitle: '',
  currentTaskDescription: '',
  currentTaskId: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initState,
  reducers: {
    setCurrentTaskTitle: (state, action: PayloadAction<string>) => {
      state.currentTaskTitle = action.payload;
    },
    setCurrentTaskDescription: (state, action: PayloadAction<string>) => {
      state.currentTaskDescription = action.payload;
    },
    setCurrentTaskId: (state, action: PayloadAction<string>) => {
      state.currentTaskId = action.payload;
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

export const { setCurrentTaskTitle, setCurrentTaskDescription, setCurrentTaskId, setTasksLoading } =
  tasksSlice.actions;

export const tasksSelector = (state: { tasksStore: IInitState }) => state.tasksStore;
