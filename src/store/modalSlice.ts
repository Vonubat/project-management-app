import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData } from 'types/boards';

type ModalState = {
  [key: `isOpen_${string}`]: boolean;
  [key: `isSubmitDisabled_${string}`]: boolean;
  boardData?: BoardData;
};

const modalInitialState: ModalState = {};

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
    setIsSubmitDisabled: (state, action: PayloadAction<{ uniqueId: string; flag: boolean }>) => {
      state[`isSubmitDisabled_${action.payload.uniqueId}`] = action.payload.flag;
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
