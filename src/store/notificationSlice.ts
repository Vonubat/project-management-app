import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { Severity } from 'constants/constants';
import { getTranslationString } from 'utils/getTranslationString';
import { isGetAction, isInfoAction, isNoNotificationAction, isSuccessAction } from './util';

type NotificationState = {
  message: string;
  severity: Severity;
  isOpen: boolean;
  isLoading: boolean;
};

const notificationInitialState: NotificationState = {
  message: '',
  severity: Severity.info,
  isOpen: false,
  isLoading: false,
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
    builder.addMatcher(isPending, (state, action) => {
      if (isGetAction(action)) {
        state.isLoading = true;
      }
    });

    builder.addMatcher(isRejected, (state, action) => {
      state.severity = Severity.error;
      state.isOpen = true;

      if (isGetAction(action)) {
        state.isLoading = false;
      }

      if (action.payload) {
        state.message = `responseError.error${action.payload}`;

        return;
      }

      if (action.error.message) {
        state.message = action.error.message;
      }
    });

    builder.addMatcher(isFulfilled, (state, action) => {
      if (isGetAction(action)) {
        state.isLoading = false;
      }

      if (isNoNotificationAction(action)) {
        return;
      }

      state.isOpen = true;
      state.message = `responseSuccess.${getTranslationString(action)}`;

      if (isInfoAction(action)) {
        state.severity === Severity.info;
        return;
      }

      if (isSuccessAction(action)) {
        state.severity = Severity.success;
        return;
      }
    });
  },
});

export default notificationSlice.reducer;

export const notificationSelector = (state: { notificationStore: NotificationState }) =>
  state.notificationStore;

export const { closeToast } = notificationSlice.actions;
