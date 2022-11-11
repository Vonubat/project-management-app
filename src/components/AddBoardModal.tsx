import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { authSelector } from 'store/authSlice';
import { createBoard } from 'store/boardListSlice';
import { useTranslation } from 'react-i18next';

interface IAddBoardModalProps {
  isOpen: boolean;
  agree: () => void;
  close: () => void;
}

export default function AddBoardModal(props: IAddBoardModalProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const { t: confirm } = useTranslation('translation', { keyPrefix: 'confirmModal' });
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector(authSelector);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const titleData = JSON.stringify({
      title: data.get('title'),
      description: data.get('description'),
    });

    dispatch(
      createBoard({
        title: titleData,
        owner: userId as string,
        users: [],
      })
    );

    event.currentTarget.reset();
  };

  return (
    <>
      <Dialog open={props.isOpen} onClose={props.close}>
        <DialogContent sx={{ p: 2 }}>
          <Typography variant="h5" align="center">
            {t('add')}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
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
            <DialogActions sx={{ p: 0, pt: 2 }}>
              <Button onClick={close}>{confirm('no')}</Button>
              <Button type="submit" onClick={props.agree}>
                {confirm('yes')}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
