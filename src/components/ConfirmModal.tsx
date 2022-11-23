import React, { FC, SyntheticEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DefaultColors } from 'constants/constants';
import WarningIcon from '@mui/icons-material/Warning';

interface IConfirmModalProps {
  isOpen: boolean;
  title: string;
  onClose: VoidFunction | ((e: SyntheticEvent) => void);
  onSubmit?: VoidFunction | ((e: SyntheticEvent) => void);
}

const ConfirmModal: FC<IConfirmModalProps> = ({ isOpen, title, onClose, onSubmit }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'confirmModal' });

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent sx={{ p: 2 }}>
        <Typography variant="h6">{title}</Typography>
      </DialogContent>
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
