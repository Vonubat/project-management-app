import React, { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';
import ConfirmModal from './ConfirmModal';
import { useAppDispatch } from 'hooks/hooks';
import { deleteColumn } from 'store/columnsSlice';
import ColumnsAddBtn from './UI/ColumnsAddBtn';

type Props = {
  children?: React.ReactNode;
  columnTitle: string;
  columnId: string;
  boardId: string;
};

const Column: FC<Pick<Props, 'children'>> = ({ children }) => {
  return (
    <Box
      sx={{
        height: 1,
        width: 1,
        py: 1,
        mx: 2,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        borderRadius: '5px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
      }}
    >
      {children}
    </Box>
  );
};

const ColumnPreview: FC<Props> = ({ columnTitle, columnId, boardId }) => {
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
      <Typography variant="h6" align="center" noWrap>
        {columnTitle}
      </Typography>
      <ColumnsAddBtn cb={openModal}>
        <Typography variant="h6">{t('addTask')}</Typography>
      </ColumnsAddBtn>
      <ConfirmModal title={t('delColumn')} isOpen={isOpen} onSubmit={submit} onClose={closeModal} />
    </Column>
  );
};

export default ColumnPreview;
