import { createSlice, isFulfilled, isRejected } from '@reduxjs/toolkit';
import { ActionName, Severity, SliceName } from 'constants/constants';
import { getTranslationString } from 'utils/getTranslationString';

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
      const [sliceName, actionName] = action.type.split('/');

      if (actionName === ActionName.getAll || actionName === ActionName.getUser) {
        return;
      }

      if (sliceName === SliceName.auth || actionName == ActionName.delete) {
        state.severity === Severity.info;
      }

      if (actionName === ActionName.create || actionName === ActionName.update) {
        state.severity = Severity.success;
      }

      state.isOpen = true;
      state.message = `responseSuccess.${getTranslationString(action)}`;
    });
  },
});

export default notificationSlice.reducer;

export const notificationSelector = (state: { notificationStore: NotificationState }) =>
  state.notificationStore;

export const { closeToast } = notificationSlice.actions;
