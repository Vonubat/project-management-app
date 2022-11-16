import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalState = {
  [key: `isOpen_${string}`]: boolean;
  isSubmitted: boolean;
  isDeclined: boolean;
  isSubmitDisabled: boolean;
  isConfirmOpen: boolean;
  isConfirmSubmitted: boolean;
  isConfirmDeclined: boolean;
  confirmTitle: string;
  currentBoardId: string;
  currentColumnId: string;
  currentTaskId: string;
};

const modalInitialState: ModalState = {
  isSubmitted: false,
  isDeclined: false,
  isSubmitDisabled: true,
  isConfirmOpen: false,
  isConfirmSubmitted: false,
  isConfirmDeclined: false,
  confirmTitle: '',
  currentBoardId: '',
  currentColumnId: '',
  currentTaskId: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: modalInitialState,
  reducers: {
    openModalForm: (state, action: PayloadAction<string>) => {
      state[`isOpen_${action.payload}`] = true;
    },
    closeModalForm: (state, action: PayloadAction<string>) => {
      state[`isOpen_${action.payload}`] = false;
    },
    setIsSubmitDisabled: (state, action) => {
      state.isSubmitDisabled = action.payload;
    },
    openConfirmWindow: (state, action) => {
      state.isConfirmOpen = true;
      state.confirmTitle = action.payload;
    },
    submitConfirmWindow: (state) => {
      state.isConfirmOpen = false;
      state.confirmTitle = modalInitialState.confirmTitle;
      state.isConfirmSubmitted = true;
    },
    declineConfirmWindow: (state) => {
      state.isConfirmOpen = false;
      state.confirmTitle = modalInitialState.confirmTitle;
      state.isConfirmDeclined = true;
    },
    resetConfirmWindow: (state) => {
      state.isConfirmOpen = false;
      state.isConfirmDeclined = false;
      state.confirmTitle = modalInitialState.confirmTitle;
    },
    setCurrentBoardId: (state, action: PayloadAction<string>) => {
      state.currentBoardId = action.payload;
    },
    setCurrentColumnId: (state, action: PayloadAction<string>) => {
      state.currentColumnId = action.payload;
    },
    setCurrentTaskId: (state, action: PayloadAction<string>) => {
      state.currentTaskId = action.payload;
    },
  },
});

export default modalSlice.reducer;

export const {
  openModalForm,
  closeModalForm,
  setIsSubmitDisabled,
  setCurrentBoardId,
  setCurrentColumnId,
  setCurrentTaskId,
} = modalSlice.actions;

export const modalSelector = (state: { modalStore: ModalState }) => state.modalStore;
