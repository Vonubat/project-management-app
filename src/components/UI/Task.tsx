import React, { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DefaultColors, GRAY_700 } from 'constants/constants';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'hooks/hooks';
import { deleteTask } from 'store/tasksSlice';
import ConfirmModal from 'components/ConfirmModal';
import DeleteBtn from './DeleteBtn';

type Props = {
  children?: React.ReactNode;
  taskTitle: string;
  columnId: string;
  boardId: string;
  taskId: string;
  order: number;
};

const Task: FC<Props> = ({ taskTitle, boardId, columnId, taskId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const dispatch = useAppDispatch();

  const submit = () => {
    dispatch(deleteTask({ boardId, columnId, taskId }));
    closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Box
        sx={{
          minWidth: 280,
          maxHeight: 50,
          mx: 1,
          fontSize: 20,
          color: GRAY_700,
          backgroundColor: 'rgba(255, 255, 255, 1)',
        }}
      >
        {taskTitle}
      </Box>
      <DeleteBtn size="small" color={DefaultColors.error} cb={openModal}></DeleteBtn>
      <ConfirmModal title={t('delTask')} isOpen={isOpen} onSubmit={submit} onClose={closeModal} />
    </Box>
  );
};

export default Task;
