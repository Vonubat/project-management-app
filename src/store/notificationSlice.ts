import { createSlice, isFulfilled, isRejected } from '@reduxjs/toolkit';
import { Severity } from 'constants/constants';

type NotificationState = {
  message: string;
  severity: Severity;
  isOpen: boolean;
};

const notificationInitialState: NotificationState = {
  message: '',
  severity: Severity.info,
  isOpen: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: notificationInitialState,
  reducers: {
    closeToast: (state) => {
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isRejected, (state, action) => {
      state.severity = Severity.error;
      state.isOpen = true;

      if (action.payload) {
        state.message = `responseError.error${action.payload}`;
        return;
      }

      if (action.error.message) {
        state.message = action.error.message;
      }
    });

    builder.addMatcher(isFulfilled, (state, action) => {
      state.isOpen = true;
      state.severity = Severity.info;
      state.message = 'Info happened';

      if (action.type.startsWith('auth/signIn')) {
        state.message = 'responseSuccess.signIn';
      }

      if (action.type.startsWith('auth/signUp')) {
        state.message = 'responseSuccess.signUp';
      }

      if (action.type.startsWith('user/delete')) {
        state.message = 'responseSuccess.deleteUser';
      }

      if (action.type.startsWith('user/update')) {
        state.message = 'responseSuccess.updateUser';
      }

      if (action.type.startsWith('board/create')) {
        state.message = 'responseSuccess.boardCreated';
      }

      if (action.type.startsWith('board/delete')) {
        state.message = 'responseSuccess.boardDeleted';
      }
    });
  },
});

export default notificationSlice.reducer;

export const notificationSelector = (state: { notificationStore: NotificationState }) =>
  state.notificationStore;

export const { closeToast } = notificationSlice.actions;
