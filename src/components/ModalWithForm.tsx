import React, { FC, ReactNode } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { closeModalForm, modalSelector } from 'store/modalSlice';

type Props = {
  modalTitle: string;
  children: ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
};

const ModalWithForm: FC<Props> = ({ modalTitle, children, onSubmit }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'confirmModal' });
  const { isOpen, isSubmitDisabled } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(closeModalForm());

  return (
    <Dialog open={isOpen}>
      <DialogContent sx={{ p: 2 }}>
        <Typography variant="h5" align="center">
          {modalTitle}
        </Typography>
        <Container component="div" maxWidth="xs">
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
            {children}
            <DialogActions sx={{ p: 0, pt: 2 }}>
              <Button onClick={closeModal}>{t('no')}</Button>
              <Button type="submit" disabled={isSubmitDisabled}>
                {t('yes')}
              </Button>
            </DialogActions>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWithForm;
