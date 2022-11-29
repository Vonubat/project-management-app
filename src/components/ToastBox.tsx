import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Slide, SlideProps, Snackbar } from '@mui/material';
import { Severity } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { notificationSelector, removeNotification } from 'store/notificationSlice';
import { Notification } from 'types/notification';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

const ToastBox = () => {
  const { alertList } = useAppSelector(notificationSelector);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [notification, setNotification] = useState<Notification | null>(null);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };

  const handleExited = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (alertList.length && !notification) {
      setNotification({ ...alertList[0] });
      dispatch(removeNotification());
      setIsOpen(true);
    } else if (alertList.length && notification && isOpen) {
      setIsOpen(false);
    }
  }, [dispatch, alertList, isOpen, notification]);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      TransitionProps={{ onExited: handleExited }}
      TransitionComponent={SlideTransition}
    >
      <Alert variant="filled" severity={notification ? notification.severity : Severity.info}>
        {notification && t(notification.message)}
        <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Alert>
    </Snackbar>
  );
};

export default ToastBox;
