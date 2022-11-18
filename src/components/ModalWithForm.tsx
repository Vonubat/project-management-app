import React, { FC, ReactNode } from 'react';
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
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { closeModalForm, modalSelector } from 'store/modalSlice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DefaultColors } from 'constants/constants';

type Props = {
  uniqueId: string;
  modalTitle: string;
  children: ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  sx?: SxProps<Theme>;
};

const ModalWithForm: FC<Props> = ({ modalTitle, children, onSubmit, sx, uniqueId }) => {
  const isOpenKey: `isOpen_${string}` = `isOpen_${uniqueId}`;
  const { t } = useTranslation('translation', { keyPrefix: 'confirmModal' });
  const { [isOpenKey]: isOpen = false, isSubmitDisabled } = useAppSelector(modalSelector);
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
              <Button onClick={closeModal}>{t('no')}</Button>
              <Button
                type="submit"
                disabled={isSubmitDisabled}
                color={DefaultColors.success}
                endIcon={<CheckCircleIcon />}
              >
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
