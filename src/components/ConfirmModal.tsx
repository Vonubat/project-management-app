import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface props {
  isOpen: boolean;
  title: string;
  agree: () => void;
  close: () => void;
}

export default function ConfirmModal(props: props) {
  const { t } = useTranslation('translation', { keyPrefix: 'confirmModal' });
  const { isOpen, title, agree, close } = props;

  return (
    <Dialog open={isOpen} onClose={props.close}>
      <DialogContent sx={{ p: 2 }}>
        <Typography variant="h6">{title}</Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={close}>{t('no')}</Button>
        <Button onClick={agree} autoFocus>
          {t('yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
