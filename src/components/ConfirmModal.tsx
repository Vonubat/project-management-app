import React, { FC, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import WarningIcon from '@mui/icons-material/Warning';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { DefaultColors } from 'constants/constants';

interface IConfirmModalProps {
  isOpen: boolean;
  title: string;
  onClose: VoidFunction | ((e: SyntheticEvent) => void);
  onSubmit?: VoidFunction | ((e: SyntheticEvent) => void);
}

const ConfirmModal: FC<IConfirmModalProps> = ({ isOpen, title, onClose, onSubmit }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'confirmModal' });

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ textAlign: 'center' }}>{title}</DialogTitle>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onClose}>{t('no')}</Button>
        {onSubmit && (
          <Button
            onClick={onSubmit}
            autoFocus
            color={DefaultColors.error}
            endIcon={<WarningIcon />}
          >
            {t('yes')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
