import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Typography } from '@mui/material';
import { GRAY_700 } from 'constants/constants';
import { useAppDispatch } from 'hooks/typedHooks';
import { changeColumnOrder, deleteColumn, deleteLocalColumn } from 'store/columnsSlice';
import { clearLocalTaskByColumnId } from 'store/tasksSlice';

import ConfirmModal from 'components/ConfirmModal';

type Props = {
  title: string;
  columnId: string;
  onClick: VoidFunction;
};

const TitleBox = styled(Box)({
  display: 'flex',
  alignItems: 'start',
  flexFlow: 'row no-wrap',
  width: '93%',
});

const ColumnTitleBox: FC<Props> = ({ title, columnId, onClick }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'columns' });

  const openConfirmModal = () => {
    setIsOpen(true);
  };

  const closeConfirmModal = () => {
    setIsOpen(false);
  };

  const submit = () => {
    dispatch(deleteLocalColumn(columnId));
    dispatch(deleteColumn(columnId));
    dispatch(changeColumnOrder());
    dispatch(clearLocalTaskByColumnId(columnId));
    closeConfirmModal();
  };

  return (
    <>
      <TitleBox>
        <Typography
          sx={{ mx: 'auto', maxWidth: '80%', wordBreak: 'break-word' }}
          onClick={onClick}
          variant="h6"
          color={GRAY_700}
          textAlign="center"
          gutterBottom
        >
          {title}
        </Typography>
        <IconButton
          color="primary"
          aria-label="delete column"
          onClick={openConfirmModal}
          edge="end"
        >
          <DeleteIcon />
        </IconButton>
      </TitleBox>
      <ConfirmModal
        title={t('delColumn')}
        isOpen={isOpen}
        onSubmit={submit}
        onClose={closeConfirmModal}
      />
    </>
  );
};

export default ColumnTitleBox;
