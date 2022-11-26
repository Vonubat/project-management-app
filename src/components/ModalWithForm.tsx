import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { DefaultColors } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { closeModalForm, modalSelector } from 'store/modalSlice';

type Props = {
  uniqueId: string;
  modalTitle: string;
  children: ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  sx?: SxProps<Theme>;
};

const ModalWithForm: FC<Props> = ({ modalTitle, children, onSubmit, sx, uniqueId }) => {
  const isOpenKey: `isOpen_${string}` = `isOpen_${uniqueId}`;
  const isSubmitDisabledKey: `isSubmitDisabled_${string}` = `isSubmitDisabled_${uniqueId}`;
  const { t } = useTranslation('translation', { keyPrefix: 'modalForm' });
  const { [isOpenKey]: isOpen = false, [isSubmitDisabledKey]: isSubmitDisabled = true } =
    useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(closeModalForm(uniqueId));

  return (
    <Dialog open={isOpen}>
      <DialogContent
        sx={{
          ...sx,
          p: 2,
        }}
      >
        <Typography variant="h5" align="center">
          {modalTitle}
        </Typography>
        <Container component="div" maxWidth="xs">
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
            {children}
            <DialogActions sx={{ p: 0, pt: 2 }}>
              <Button onClick={closeModal}>{t('cancel')}</Button>
              <Button
                type="submit"
                disabled={isSubmitDisabled}
                color={DefaultColors.success}
                endIcon={<CheckCircleIcon />}
              >
                {t('submit')}
              </Button>
            </DialogActions>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWithForm;
