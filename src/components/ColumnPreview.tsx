import React, { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ConfirmModal from './ConfirmModal';
import { useAppDispatch } from 'hooks/hooks';
import { deleteColumn } from 'store/columnsSlice';
import ColumnsAddBtn from './UI/ColumnsAddBtn';
import ColumnTextarea from './UI/ColumnTextarea';
import DeleteBtn from './UI/DeleteBtn';
import { DefaultColors } from 'constants/constants';

type Props = {
  children?: React.ReactNode;
  columnTitle: string;
  columnId: string;
  boardId: string;
  order: number;
};

const Column: FC<Pick<Props, 'children'>> = ({ children }) => {
  return (
    <Box
      sx={{
        height: 'fit-content',
        maxHeight: 0.9,
        py: 1,
        mx: 2,
        maxWidth: 300,
        minWidth: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1,
        boxShadow: 3,
        borderRadius: '5px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      {children}
    </Box>
  );
};

const ColumnPreview: FC<Props> = ({ columnTitle, columnId, boardId, order }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'columns' });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const submit = () => {
    dispatch(deleteColumn({ boardId, columnId }));
    closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Column>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <ColumnTextarea value={columnTitle} columnId={columnId} boardId={boardId} order={order} />
        <DeleteBtn size="small" color={DefaultColors.error} cb={openModal}></DeleteBtn>
      </Box>
      <ColumnsAddBtn cb={openModal}>
        <Typography variant="h6">{t('addTask')}</Typography>
      </ColumnsAddBtn>
      <ConfirmModal title={t('delColumn')} isOpen={isOpen} onSubmit={submit} onClose={closeModal} />
    </Column>
  );
};

export default ColumnPreview;
