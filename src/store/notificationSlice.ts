import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';
import { Severity, StatusCode, UNAUTHORIZED_MESSAGE } from 'constants/constants';
import { Notification } from 'types/notification';
import { getTranslationString } from 'utils/getTranslationString';

import { isGetAction, isInfoAction, isNoNotificationAction, isSuccessAction } from './util';

type NotificationState = {
  alertList: Array<Notification>;
  isLoading: boolean;
};

type ShowNotificationPayload = {
  message: string;
  severity?: Severity;
};

const notificationInitialState: NotificationState = {
  alertList: [],
  isLoading: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: notificationInitialState,
  reducers: {
    removeNotification: (state) => {
      state.alertList = state.alertList.slice(1);
    },
    showNotification: (state, { payload }: PayloadAction<ShowNotificationPayload>) => {
      const { message, severity = Severity.info } = payload;
      state.alertList.push({ message, severity });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPending, (state, action) => {
      if (isGetAction(action)) {
        state.isLoading = true;
      }
    });

    builder.addMatcher(isRejected, (state, action) => {
      const severity = Severity.error;

      if (isGetAction(action)) {
        state.isLoading = false;
      }

      if (action.payload) {
        state.alertList.push({
          message: `responseError.error${action.payload}`,
          severity,
        });

        return;
      }

      if (action.error.message === UNAUTHORIZED_MESSAGE) {
        state.alertList.push({
          message: `responseError.error${StatusCode.unauthorized}`,
          severity,
        });

        return;
      }

      if (action.error.message) {
        state.alertList.push({
          message: action.error.message,
          severity,
        });
      }
    });

    builder.addMatcher(isFulfilled, (state, action) => {
      if (isGetAction(action)) {
        state.isLoading = false;
      }

      if (isNoNotificationAction(action)) {
        return;
      }

      const message = `responseSuccess.${getTranslationString(action)}`;

      if (isInfoAction(action)) {
        state.alertList.push({ message, severity: Severity.info });
        return;
      }

      if (isSuccessAction(action)) {
        state.alertList.push({ message, severity: Severity.success });
        return;
      }
    });
  },
});

export default notificationSlice.reducer;

export const notificationSelector = (state: { notificationStore: NotificationState }) =>
  state.notificationStore;

export const { removeNotification, showNotification } = notificationSlice.actions;
