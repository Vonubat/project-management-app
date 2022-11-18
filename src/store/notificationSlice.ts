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

      console.log(action.type);

      if (action.type.startsWith('auth/signIn')) {
        state.message = 'responseSuccess.signIn';
        return;
      }

      if (action.type.startsWith('auth/signUp')) {
        state.message = 'responseSuccess.signUp';
        return;
      }

      if (action.type.startsWith('user/delete')) {
        state.message = 'responseSuccess.deleteUser';
        return;
      }

      if (action.type.startsWith('user/update')) {
        state.message = 'responseSuccess.updateUser';
        return;
      }

      if (action.type.startsWith('board/create')) {
        state.message = 'responseSuccess.boardCreated';
        return;
      }

      if (action.type.startsWith('board/delete')) {
        state.message = 'responseSuccess.boardDeleted';
        return;
      }

      if (action.type.startsWith('board/edit')) {
        state.message = 'responseSuccess.boardEdited';
        return;
      }

      if (action.type.startsWith('columns/create')) {
        state.message = 'responseSuccess.columnsCreate';
        return;
      }

      if (action.type.startsWith('columns/update')) {
        state.message = 'responseSuccess.columnsUpdate';
        return;
      }

      if (action.type.startsWith('columns/delete')) {
        state.message = 'responseSuccess.columnsDelete';
        return;
      }
    });
  },
});

export default notificationSlice.reducer;

export const notificationSelector = (state: { notificationStore: NotificationState }) =>
  state.notificationStore;

export const { closeToast } = notificationSlice.actions;
