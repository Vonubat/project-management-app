import { Action, AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Status } from 'constants/constants';
import TasksService from 'services/tasksService';
import { RejectedAction, StatusType } from 'types/store';
import { TaskData, TaskParamsCreate, TaskParamsUpdate } from 'types/tasks';

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
  { boardId: string; columnId: string; data: TaskParamsCreate },
  { rejectValue: number }
>('tasks/create', async (arg, { rejectWithValue }) => {
  try {
    const res = await TasksService.createTask(arg.boardId, arg.columnId, arg.data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError;

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.status);
  }
});

export const updateTask = createAsyncThunk<
  TaskData,
  { boardId: string; columnId: string; taskId: string; data: TaskParamsUpdate },
  { rejectValue: number }
>('tasks/update', async ({ boardId, columnId, taskId, data }, { rejectWithValue }) => {
  try {
    const res = await TasksService.updateTask(boardId, columnId, taskId, data);
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
  { boardId: string; columnId: string; taskId: string },
  {
    rejectValue: number;
  }
>('tasks/delete', async ({ boardId, columnId, taskId }, { rejectWithValue }) => {
  try {
    const res = await TasksService.deleteTask(boardId, columnId, taskId);

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
  status: StatusType;
  currentTaskTitle: string;
  currentTaskDescription: string;
  currentTaskId: string;
}

const initState: IInitState = {
  tasks: {},
  status: Status.idle,
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
  },
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
      state.status = Status.pending;
    });

    builder.addMatcher(isRejectedAction, (state) => {
      state.status = Status.failed;
    });

    builder.addMatcher(isFulFilledAction, (state) => {
      state.status = Status.succeeded;
    });
  },
});

export default tasksSlice.reducer;

export const { setCurrentTaskTitle, setCurrentTaskDescription, setCurrentTaskId } =
  tasksSlice.actions;

export const tasksSelector = (state: { tasksStore: IInitState }) => state.tasksStore;
