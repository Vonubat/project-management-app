import React, { FC, SyntheticEvent, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DefaultColors, GRAY_700, TypeofModal } from 'constants/constants';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'hooks/hooks';
import {
  deleteTask,
  setCurrentTaskDescription,
  setCurrentTaskId,
  setCurrentTaskTitle,
  setTasksLoading,
} from 'store/tasksSlice';
import ConfirmModal from 'components/ConfirmModal';
import CustomIconBtn from './CustomIconBtn';
import { theme } from 'components/Page';
import { setCurrentColumnId } from 'store/columnsSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { openModalForm } from 'store/modalSlice';
import isTouchEnabled from 'utils/isTouchEnabled';

const taskStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  minWidth: 280,
  maxWidth: 280,
  maxHeight: 40,
  minHeight: 40,
  margin: '0 1rem',
  padding: '5px',
  borderRadius: '3px',
  fontSize: 20,
  color: GRAY_700,
  backgroundColor: 'rgba(255, 255, 255, 1)',
  cursor: 'pointer',
  boxShadow: `${theme.shadows[3]}`,
};

type Props = {
  children?: React.ReactNode;
  taskTitle: string;
  taskDescription: string;
  columnId: string;
  taskId: string;
  order: number;
};

const Task: FC<Props> = ({ taskTitle, taskDescription, columnId, taskId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const dispatch = useAppDispatch();
  const isTouchScreenDevice: boolean = isTouchEnabled();

  const submit = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(setTasksLoading(columnId));
    dispatch(deleteTask({ columnId, taskId }));
    closeConfirmModal(e);
  };

  const openConfirmModal = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const closeConfirmModal = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const openEditTaskModal = () => {
    dispatch(setCurrentColumnId(columnId));
    dispatch(setCurrentTaskId(taskId));
    dispatch(setCurrentTaskTitle(taskTitle));
    dispatch(setCurrentTaskDescription(taskDescription));
    dispatch(openModalForm(TypeofModal.editTask));
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <Box
      sx={taskStyles}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={openEditTaskModal}
    >
      <Typography variant="h6" noWrap>
        {taskTitle}
      </Typography>
      {(isHovering || isTouchScreenDevice) && (
        <CustomIconBtn size="small" color={DefaultColors.error} cb={openConfirmModal}>
          <DeleteIcon />
        </CustomIconBtn>
      )}
      <ConfirmModal
        title={t('delTask')}
        isOpen={isOpen}
        onSubmit={submit}
        onClose={closeConfirmModal}
      />
    </Box>
  );
};

export default Task;
