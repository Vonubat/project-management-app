import React, { FC, ReactNode } from 'react';
import { Button, Container, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
  isSubmitDisabled: boolean;
  modalTitle: string;
  children: ReactNode;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
};

const ModalWindow: FC<Props> = ({
  modalTitle,
  children,
  isOpen,
  onClose,
  onSubmit,
  isSubmitDisabled,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'confirmModal' });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent sx={{ p: 2 }}>
        <Typography variant="h5" align="center">
          {modalTitle}
        </Typography>
        <Container component="div" maxWidth="xs">
          {children}
        </Container>
        <DialogActions sx={{ p: 0, pt: 2 }}>
          <Button onClick={onClose}>{t('no')}</Button>
          <Button type="submit" form="modal-form" onClick={onSubmit} disabled={isSubmitDisabled}>
            {t('yes')}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWindow;
