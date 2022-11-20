import React, { FC, SyntheticEvent, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DefaultColors, GRAY_700, TypeofModal } from 'constants/constants';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'hooks/hooks';
import {
  changeLocalTaskOrder,
  changeTaskOrder,
  deleteTask,
  setCurrentTaskInfo,
  setTasksLoading,
} from 'store/tasksSlice';
import ConfirmModal from 'components/ConfirmModal';
import CustomIconBtn from './CustomIconBtn';
import { theme } from 'components/Page';
import { setCurrentColumnId } from 'store/columnsSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { openModalForm } from 'store/modalSlice';
import isTouchEnabled from 'utils/isTouchEnabled';
import { ConnectableElement, useDrag, useDrop } from 'react-dnd';
import { DropTaskItem } from 'types/tasks';

const taskStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  minWidth: 280,
  maxWidth: 280,
  maxHeight: 40,
  minHeight: 40,
  mx: 1,
  my: 0.3,
  p: 0.625,
  borderRadius: '3px',
  fontSize: 20,
  color: GRAY_700,
  // backgroundColor: 'rgba(255, 255, 255, 1)',
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

const Task: FC<Props> = ({ taskTitle, taskDescription, columnId, taskId, order }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useAppDispatch();
  const isTouchScreenDevice: boolean = isTouchEnabled();
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: {
      id: taskId,
      columnId,
      order,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop(item: DropTaskItem) {
      if (item.columnId !== columnId || item.order !== order) {
        dispatch(
          changeLocalTaskOrder({
            dragOrder: item.order,
            dragColumnId: item.columnId,
            dropOrder: order,
            dropColumnId: columnId,
          })
        );
        dispatch(changeTaskOrder([item.columnId, columnId]));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

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
    dispatch(
      setCurrentTaskInfo({
        currentTaskId: taskId,
        currentTaskTitle: taskTitle,
        currentTaskDescription: taskDescription,
      })
    );
    dispatch(setCurrentColumnId(columnId));
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
      ref={(node: ConnectableElement) => drag(drop(node))}
      sx={{ ...taskStyles, bgcolor: isOver ? 'lightBlue' : 'white', opacity: isDragging ? 0 : 1 }}
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
