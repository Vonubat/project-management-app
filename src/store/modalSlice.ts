import { createSlice } from '@reduxjs/toolkit';

type ModalState = {
  isOpen: boolean;
  isSubmitted: boolean;
  isDeclined: boolean;
  isSubmitDisabled: boolean;
  isConfirmOpen: boolean;
  isConfirmSubmitted: boolean;
  isConfirmDeclined: boolean;
  confirmTitle: string;
};

const modalInitialState: ModalState = {
  isOpen: false,
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
    openModalForm: (state) => {
      state.isOpen = true;
    },
    closeModalForm: (state) => {
      state.isOpen = false;
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
  },
});

export default modalSlice.reducer;

export const { openModalForm, closeModalForm, setIsSubmitDisabled } = modalSlice.actions;

export const modalSelector = (state: { modalStore: ModalState }) => state.modalStore;
