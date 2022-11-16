import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData } from 'types/boards';

type ModalState = {
  [key: `isOpen_${string}`]: boolean;
  isSubmitted: boolean;
  isDeclined: boolean;
  isSubmitDisabled: boolean;
  isConfirmOpen: boolean;
  isConfirmSubmitted: boolean;
  isConfirmDeclined: boolean;
  confirmTitle: string;
  boardData?: BoardData;
};

const modalInitialState: ModalState = {
  isSubmitted: false,
  isDeclined: false,
  isSubmitDisabled: true,
  isConfirmOpen: false,
  isConfirmSubmitted: false,
  isConfirmDeclined: false,
  confirmTitle: '',
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
    setBoardParams: (state, action: PayloadAction<BoardData>) => {
      state.boardData = action.payload;
    },
    clearBoardParams: (state) => {
      state.boardData = undefined;
    },
  },
});

export default modalSlice.reducer;

export const {
  openModalForm,
  closeModalForm,
  setIsSubmitDisabled,
  setBoardParams,
  clearBoardParams,
} = modalSlice.actions;

export const modalSelector = (state: { modalStore: ModalState }) => state.modalStore;
