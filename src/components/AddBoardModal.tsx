import React from 'react';
import { TextField, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { authSelector } from 'store/authSlice';
import { createBoard } from 'store/boardListSlice';
import { useTranslation } from 'react-i18next';
import ModalWindow from './ModalWindow';

interface IAddBoardModalProps {
  isOpen: boolean;
  onSubmit: VoidFunction;
  onClose: VoidFunction;
}

export default function AddBoardModal({ isOpen, onClose, onSubmit }: IAddBoardModalProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector(authSelector);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get('title') as string;
    const description = data.get('description') as string;

    dispatch(
      createBoard({
        title,
        description,
        owner: userId as string,
        users: [],
      })
    );

    event.currentTarget.reset();
  };

  return (
    <ModalWindow
      modalTitle={t('add')}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={onSubmit}
      isSubmitDisabled={false}
    >
      <Box component="form" id="modal-form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label={t('title')}
          name="title"
          autoComplete="title"
          autoFocus
          sx={{ my: 2 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          multiline
          rows={4}
          name="description"
          label={t('description')}
          type="description"
          id="description"
          autoComplete="current-password"
          sx={{ my: 0 }}
        />
      </Box>
    </ModalWindow>
  );
}
