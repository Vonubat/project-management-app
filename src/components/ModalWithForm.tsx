import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DefaultColors } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { closeModalForm, modalSelector } from 'store/modalSlice';

type Props = {
  uniqueId: string;
  modalTitle: string;
  children: ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
};

const ModalWithForm: FC<Props> = ({ modalTitle, children, onSubmit, uniqueId }) => {
  const isOpenKey: `isOpen_${string}` = `isOpen_${uniqueId}`;
  const isSubmitDisabledKey: `isSubmitDisabled_${string}` = `isSubmitDisabled_${uniqueId}`;
  const { t } = useTranslation('translation', { keyPrefix: 'modalForm' });
  const { [isOpenKey]: isOpen = false, [isSubmitDisabledKey]: isSubmitDisabled = true } =
    useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(closeModalForm(uniqueId));

  return (
    <Dialog open={isOpen} onClose={closeModal} maxWidth="xs" fullWidth>
      <DialogTitle> {modalTitle}</DialogTitle>
      <DialogContent>
        <Box component="form" id="modal-form" onSubmit={onSubmit} sx={{ mt: 1 }}>
          {children}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>{t('cancel')}</Button>
        <Button
          type="submit"
          disabled={isSubmitDisabled}
          color={DefaultColors.success}
          endIcon={<CheckCircleIcon />}
          form="modal-form"
        >
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWithForm;
