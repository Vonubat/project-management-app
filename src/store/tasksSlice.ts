import { Action, AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Status } from 'constants/constants';
import TasksService from 'services/tasksService';
import { StatusType } from 'types/store';
import { TaskData, TaskParamsCreate, TaskParamsUpdate } from 'types/tasks';

interface RejectedAction extends Action {
  error: Error | AxiosError;
}

interface FulFilledAction extends Action {
  payload: TaskData[] | TaskData;
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

export const getAllTasks = createAsyncThunk<TaskData[], { boardId: string; columnId: string }>(
  'tasks/getAll',
  async (arg) => {
    const res = await TasksService.getAllTasks(arg.boardId, arg.columnId);
    return res.data;
  }
);

export const createTask = createAsyncThunk<
  TaskData,
  { boardId: string; columnId: string; data: TaskParamsCreate }
>('tasks/create', async (arg) => {
  const res = await TasksService.createTask(arg.boardId, arg.columnId, arg.data);
  return res.data;
});

export const updateTask = createAsyncThunk<
  TaskData,
  { boardId: string; columnId: string; taskId: string; data: TaskParamsUpdate }
>('tasks/update', async (arg) => {
  const res = await TasksService.updateTask(arg.boardId, arg.columnId, arg.taskId, arg.data);
  return res.data;
});

export const deleteTask = createAsyncThunk<
  TaskData,
  { boardId: string; columnId: string; taskId: string }
>('tasks/delete', async (arg) => {
  const res = await TasksService.deleteTask(arg.boardId, arg.columnId, arg.taskId);
  return res.data;
});

interface IInitState {
  tasks: { [index: TaskData['columnId']]: TaskData[] };
  error: string | null | undefined;
  status: StatusType;
}

const initState: IInitState = {
  tasks: {},
  error: null,
  status: Status.idle,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.fulfilled, (state, { payload, meta }) => {
      state.tasks[meta.arg.columnId] = payload;
    });

    builder.addCase(createTask.fulfilled, (state, { payload, meta }) => {
      state.tasks[meta.arg.columnId].push(payload);
    });

    builder.addCase(updateTask.fulfilled, (state, { payload, meta }) => {
      state.tasks[meta.arg.columnId] = state.tasks[meta.arg.columnId].map((task) =>
        task._id === payload._id ? payload : task
      );
    });

    builder.addCase(deleteTask.fulfilled, (state, { payload, meta }) => {
      state.tasks[meta.arg.columnId] = state.tasks[meta.arg.columnId].filter(
        (task) => task._id !== payload._id
      );
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

export default tasksSlice.reducer;

export const tasksSelector = (state: { tasksStore: IInitState }) => state.tasksStore;
