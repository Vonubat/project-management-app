import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { closeToast, notificationSelector } from 'store/notificationSlice';

const ToastBox = () => {
  const { isOpen, message, severity } = useAppSelector(notificationSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={() => dispatch(closeToast())}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert variant="filled" severity={severity}>
        {t(message)}
      </Alert>
    </Snackbar>
  );
};

export default ToastBox;
